const pool = require('../db/pool');

const users = {
  findAll: () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      const selectQuery = 'SELECT id, username, email, password FROM users;';
      connection.query(selectQuery, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  create: (user) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      connection.query('INSERT INTO users SET ?;', user, (err, result) => {
        connection.release();
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  findById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query('SELECT id FROM users WHERE id LIKE ?;', id, (err, result) => {
        connection.release();
        if (err) {
          console.log(result);
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findUserById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query('SELECT username, email FROM users WHERE id LIKE ?;', id, (err, result) => {
        connection.release();
        if (err) {
          console.log(result);
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findByEmail: (email) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query('SELECT * FROM users WHERE email LIKE ?;', email, (err, result) => {
        connection.release();
        if (err) {
          console.log(result);
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  updateUsernameByEmail: (user) => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET username = ?, WHERE email = ?;';
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      connection.query(updateQuery, [user.username, user.email], (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  updatePasswordByEmail: (user) => new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET password = ?, WHERE email = ?;';
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      connection.query(updateQuery, [user.password, user.email], (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
};

module.exports = users;