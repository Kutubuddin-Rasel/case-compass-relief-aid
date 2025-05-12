
const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'your_oracle_username',
  password: process.env.DB_PASSWORD || 'your_oracle_password',
  connectString: process.env.DB_CONNECT_STRING || 'localhost:1521/XE'
};

// Initialize Oracle connection pool
async function initializeDbPool() {
  try {
    // Set Oracle client configuration options
    oracledb.autoCommit = true;
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    
    await oracledb.createPool({
      ...dbConfig,
      poolIncrement: 1,
      poolMax: 10,
      poolMin: 0,
      poolTimeout: 60,
      queueTimeout: 60000 // 60 seconds
    });
    console.log('Oracle connection pool created successfully');
  } catch (err) {
    console.error('Error creating connection pool:', err);
    console.log('Will attempt to continue without connection pool. Individual connections will be created as needed.');
    // Don't exit process, try to run without pool
  }
}

// Helper to get connections (from pool or direct)
async function getConnection() {
  try {
    // Try to get connection from pool first
    return await oracledb.getConnection();
  } catch (poolErr) {
    console.warn('Could not get connection from pool, trying direct connection:', poolErr.message);
    try {
      // Fall back to direct connection
      return await oracledb.getConnection(dbConfig);
    } catch (directErr) {
      console.error('Failed to establish direct connection:', directErr);
      throw new Error('Database connection failed. Please check your Oracle database configuration.');
    }
  }
}

// API endpoint to test database connection
app.get('/api/test-connection', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT 1 FROM DUAL');
    res.json({ 
      success: true, 
      message: 'Database connection successful', 
      data: result.rows,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to connect to database', 
      error: err.message,
      timestamp: new Date().toISOString()
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});

// API endpoint to get cases
app.get('/api/cases', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM cases ORDER BY lastUpdated DESC',
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Error fetching cases:', err);
    // Send more informative error based on type
    if (err.message.includes('ORA-00942')) {
      res.status(500).json({ 
        success: false, 
        message: 'Table "cases" does not exist. Please check database schema setup.', 
        error: err.message 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch cases', 
        error: err.message 
      });
    }
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});

// API endpoint to get a single case by ID
app.get('/api/cases/:id', async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM cases WHERE id = :id',
      [id],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Case not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Error fetching case:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch case', error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});

// Add health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'UP', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Initialize DB pool and start server
async function startServer() {
  try {
    await initializeDbPool();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
