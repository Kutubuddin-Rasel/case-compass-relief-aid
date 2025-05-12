
# Victim Support System - Backend Service

This backend service connects the React frontend to an Oracle 10g database.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure your Oracle database:
   - Copy `.env.example` to `.env`
   - Update the `.env` file with your Oracle database credentials

3. Oracle Client Setup:
   - Install the Oracle Instant Client for your platform
   - Set the `LD_LIBRARY_PATH` environment variable to point to the Instant Client directory
   
   For example:
   ```bash
   export LD_LIBRARY_PATH=/path/to/instantclient
   ```

4. Start the server:
```bash
npm start
```

The server will run on port 5000 by default.

## API Endpoints

- `GET /api/test-connection` - Test Oracle database connection
- `GET /api/cases` - Get all cases
- `GET /api/cases/:id` - Get a case by ID

## Database Schema Setup

Before using the application, you'll need to create the necessary tables in your Oracle database.
Below is the SQL script for creating the required tables:

```sql
-- Create Cases table
CREATE TABLE cases (
    id VARCHAR2(20) PRIMARY KEY,
    title VARCHAR2(100) NOT NULL,
    status VARCHAR2(20) NOT NULL,
    type VARCHAR2(50),
    description VARCHAR2(1000),
    victim VARCHAR2(100),
    assignedStaff VARCHAR2(100),
    openDate DATE,
    lastUpdated DATE
);

-- Insert sample data
INSERT INTO cases (id, title, status, type, description, victim, assignedStaff, openDate, lastUpdated)
VALUES (
    'CS-2023-001',
    'Medical Treatment Support',
    'open',
    'medical',
    'Victim requires assistance with medical treatment expenses after assault.',
    'John Doe',
    'Sarah Johnson',
    TO_DATE('2025-05-01', 'YYYY-MM-DD'),
    TO_DATE('2025-05-02', 'YYYY-MM-DD')
);

INSERT INTO cases (id, title, status, type, description, victim, assignedStaff, openDate, lastUpdated)
VALUES (
    'CS-2023-002',
    'Legal Aid Application',
    'in-progress',
    'legal',
    'Assistance with court proceedings and legal representation.',
    'Jane Smith',
    'Michael Brown',
    TO_DATE('2025-04-28', 'YYYY-MM-DD'),
    TO_DATE('2025-04-30', 'YYYY-MM-DD')
);

INSERT INTO cases (id, title, status, type, description, victim, assignedStaff, openDate, lastUpdated)
VALUES (
    'CS-2023-003',
    'Rehabilitation Program',
    'closed',
    'support',
    'Post-trauma rehabilitation and therapy sessions.',
    'Robert Wilson',
    'Emily Davis',
    TO_DATE('2025-04-10', 'YYYY-MM-DD'),
    TO_DATE('2025-04-15', 'YYYY-MM-DD')
);

INSERT INTO cases (id, title, status, type, description, victim, assignedStaff, openDate, lastUpdated)
VALUES (
    'CS-2023-004',
    'Emergency Housing Assistance',
    'open',
    'support',
    'Temporary housing needed due to unsafe living conditions.',
    'Maria Garcia',
    'David Chen',
    TO_DATE('2025-05-03', 'YYYY-MM-DD'),
    TO_DATE('2025-05-03', 'YYYY-MM-DD')
);

COMMIT;
```
