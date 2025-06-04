const fs   = require('fs');
const path = require('path');


const express = require('express');
const cors = require('cors');
// server.js (near the top, before any oracledb calls)
const oracledb = require('oracledb');

// If you installed Instant Client in C:\oracle\instantclient_19_26:
oracledb.initOracleClient({ libDir: 'C:\\Oracle\\instantclient_19_26' });
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  user:         process.env.DB_USER || 'avms_app',
  password:     process.env.DB_PASSWORD || 'avms_pass',
  connectString:process.env.DB_CONNECT_STRING || 'localhost:1521/XE'
};

// Helper to get a connection (tries pool first, then direct)
async function getConnection() {
  try {
    return await oracledb.getConnection();         // from pool if created
  } catch {
    return await oracledb.getConnection(dbConfig); // fallback
  }
}

// Initialize a simple pool
async function initPool() {
  try {
    oracledb.autoCommit = true;
    oracledb.outFormat  = oracledb.OUT_FORMAT_OBJECT;
    await oracledb.createPool({ ...dbConfig, poolMin: 0, poolMax: 10, poolIncrement: 1 });
    console.log('Connection pool started');
  } catch (e) {
    console.warn('Pool init failed, continuing without pool:', e.message);
  }
}


// -- CRUD ROUTES FOR ALL TABLES ----------------------------------------------

// Generic factory to wire up /api/<path> routes for a table
function addCrud(path, table, pk, seq) {
  // LIST
  app.get(`/api/${path}`, async (req, res) => {
    let conn;
    try {
      conn = await getConnection();
      const result = await conn.execute(`SELECT * FROM ${table}`);
      res.json({ success:true, data: result.rows });
    } catch (e) {
      console.error(`GET /api/${path}`, e);
      res.status(500).json({ success:false, error: e.message });
    } finally {
      conn && conn.close();
    }
  });

  // GET ONE
  app.get(`/api/${path}/:id`, async (req, res) => {
    let conn;
    try {
      conn = await getConnection();
      const result = await conn.execute(
        `SELECT * FROM ${table} WHERE ${pk} = :id`,
        [req.params.id]
      );
      if (!result.rows.length) {
        return res.status(404).json({ success:false, message:`${table} not found` });
      }
      res.json({ success:true, data: result.rows[0] });
    } catch (e) {
      console.error(`GET /api/${path}/:id`, e);
      res.status(500).json({ success:false, error: e.message });
    } finally {
      conn && conn.close();
    }
  });

  // CREATE
  app.post(`/api/${path}`, async (req, res) => {
    let conn;
    try {
      conn = await getConnection();
      const cols   = Object.keys(req.body);
      const binds  = cols.map(c => `:${c}`);
      if (seq) { cols.unshift(pk); binds.unshift(`${seq}.NEXTVAL`); }
      const sql    = `INSERT INTO ${table} (${cols.join(',')})
                      VALUES (${binds.join(',')})
                      RETURNING ${pk} INTO :newId`;
      const params = { ...req.body, newId: { dir: oracledb.BIND_OUT } };
      const result = await conn.execute(sql, params);
      res.status(201).json({ success:true, id: result.outBinds.newId[0] });
    } catch (e) {
      console.error(`POST /api/${path}`, e);
      res.status(500).json({ success:false, error: e.message });
    } finally {
      conn && conn.close();
    }
  });

  // UPDATE
  app.put(`/api/${path}/:id`, async (req, res) => {
    let conn;
    try {
      conn = await getConnection();
      const cols    = Object.keys(req.body);
      const setExpr = cols.map(c => `${c} = :${c}`).join(',');
      const sql     = `UPDATE ${table} SET ${setExpr} WHERE ${pk} = :id`;
      await conn.execute(sql, { ...req.body, id: req.params.id });
      res.json({ success:true });
    } catch (e) {
      console.error(`PUT /api/${path}/:id`, e);
      res.status(500).json({ success:false, error: e.message });
    } finally {
      conn && conn.close();
    }
  });

  // DELETE
  app.delete(`/api/${path}/:id`, async (req, res) => {
    let conn;
    try {
      conn = await getConnection();
      await conn.execute(
        `DELETE FROM ${table} WHERE ${pk} = :id`,
        [req.params.id]
      );
      res.json({ success:true });
    } catch (e) {
      console.error(`DELETE /api/${path}/:id`, e);
      res.status(500).json({ success:false, error: e.message });
    } finally {
      conn && conn.close();
    }
  });
}

// Wire up each table
addCrud('victims',      'victim',       'victim_id',      'seq_victim');
addCrud('cases',        'case_t',       'case_id',        'seq_case_t');
addCrud('doctors',      'doctor',       'doctor_id',      'seq_doctor');
addCrud('appointments', 'appointment',  'appointment_id', 'seq_appointment');
addCrud('consents',     'consent',      'consent_id',     'seq_consent');
addCrud('case-notes',   'case_note',    'note_id',        'seq_case_note');
addCrud('medical-recs','medical_rec',   'record_id',      'seq_medical_rec');
addCrud('legal-docs',   'legal_doc',    'document_id',    'seq_legal_doc');
addCrud('financial-aid','financial_aid','aid_id',         'seq_financial_aid');
addCrud('users',        'users',        'user_id',        'seq_users');
addCrud('roles',        'roles',        'role_id',        'seq_roles');
addCrud('user-roles',   'user_role',    'user_role_id',   'seq_user_role');
addCrud('notifications','notification', 'notification_id','seq_notification');

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status:'UP', timestamp:new Date().toISOString() });
});

// Start everything
initPool()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start pool:', err);
    process.exit(1);
  });

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


// Initialize pool and start server on auto-port, then write root .env
initPool()
  .then(() => {
    const server = app.listen(PORT, () => {
      const boundPort = server.address().port;
      const apiUrl    = `http://localhost:${boundPort}/api`;

      // Overwrite root .env for Vite
      const rootEnvPath = path.resolve(__dirname, '../.env');
      fs.writeFileSync(rootEnvPath, `VITE_API_URL=${apiUrl}\n`);
      console.log(`📡 Updated ${rootEnvPath}: VITE_API_URL=${apiUrl}`);

      // Log where the back end is listening
      console.log(`🚀 Back end running at ${apiUrl}`);
    });

    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} in use. Free it or set PORT in backend/.env`);
        process.exit(1);
      }
    });
  })
  .catch(err => {
    console.error('Failed to initialize DB pool:', err);
    process.exit(1);
  });
