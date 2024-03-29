const pool = require('../db/pool');
const topics = {
    findAll: () => new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err);

            const selectQuery = 'SELECT * FROM topics';
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

            const selectQuery = 'SELECT * FROM topics WHERE id=?';
            connection.query(selectQuery, id, (err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }),
    findByName: (name) => new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err);

            const selectQuery = 'SELECT * FROM topics WHERE name LIKE ?';
            connection.query(selectQuery, name, (err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }),
    save: (topic) => new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err);

            const createQuery = 'INSERT INTO topics SET ?';
            connection.query(createQuery, topic, (err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }),
    deleteById: (id) => new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err);

            const deleteQuery = 'DELETE FROM topics WHERE id=?';
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
module.exports = topics;