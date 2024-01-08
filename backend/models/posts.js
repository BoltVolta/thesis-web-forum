const pool = require('../db/pool');
const posts = {
  findAll: () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      connection.query('SELECT * FROM posts;', (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findById: (id) => new Promise((resolve, reject) => {
    const selectQuery = 'SELECT * FROM posts WHERE id=?;';
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      connection.query(selectQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  save: (post) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      connection.query('INSERT INTO posts SET ?', post, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  deleteById: (id) => new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM posts WHERE id=?;';
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      connection.query(deleteQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
};
module.exports = posts;