const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

const createUsersTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL
    );
  `;
  try {
    await pool.query(queryText);
    console.log('Users table created');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

createUsersTable();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
