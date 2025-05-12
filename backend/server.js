
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
    await oracledb.createPool({
      ...dbConfig,
      poolIncrement: 1,
      poolMax: 10,
      poolMin: 0
    });
    console.log('Oracle connection pool created successfully');
  } catch (err) {
    console.error('Error creating connection pool:', err);
    process.exit(1);
  }
}

// API endpoint to test database connection
app.get('/api/test-connection', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute('SELECT 1 FROM DUAL');
    res.json({ success: true, message: 'Database connection successful', data: result.rows });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ success: false, message: 'Failed to connect to database', error: err.message });
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
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      'SELECT * FROM cases',
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Error fetching cases:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch cases', error: err.message });
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
    connection = await oracledb.getConnection();
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

// Initialize DB pool and start server
async function startServer() {
  try {
    await initializeDbPool();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
