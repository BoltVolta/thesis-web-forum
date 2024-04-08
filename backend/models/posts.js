const pool = require('../db/pool');
const posts = {
  findAll: () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      const selectQuery = 'SELECT * FROM posts';
      connection.query(selectQuery, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      const selectQuery = 'SELECT * FROM posts WHERE id=?';
      connection.query(selectQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findByTopicId: (topic_id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      const selectQuery = 'SELECT * FROM posts WHERE topic_id=?';
      connection.query(selectQuery, topic_id, (err, result) => {
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

      const createQuery = 'INSERT INTO posts SET ?';
      connection.query(createQuery, post, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  editPost: (post, id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      const updateQuery = 'UPDATE posts SET ? WHERE id LIKE ?;';
      connection.query(updateQuery, [post, id], (err, result) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  deleteById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      const deleteQuery = 'DELETE FROM posts WHERE id=?';
      connection.query(deleteQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  deleteByTopicId: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      const deleteQuery = 'DELETE FROM posts WHERE topic_id=?';
      connection.query(deleteQuery, id, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  addLikeById: (vote, userId, id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err)
        return reject(err);

      const addLikeQuery = "UPDATE posts SET likes = likes + ?, wholiked = json_set(COALESCE(wholiked, '{}'), ?, 'true') WHERE id=?";
      connection.query(addLikeQuery, [vote, '$."' + [userId] + '"', id], (err, result) => {
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