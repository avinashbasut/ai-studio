
const db = require('../core/database');

const createUser = async (username, email, passwordHash, role = 'Creator') => {
  const { rows } = await db.query(
    'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at',
    [username, email, passwordHash, role]
  );
  return rows[0];
};

const findUserByEmail = async (email) => {
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
};

const findUserByUsername = async (username) => {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0];
};

const updateUserPassword = async (email, passwordHash) => {
    const { rows } = await db.query(
        'UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING id, email',
        [passwordHash, email]
    );
    return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUserPassword
};
