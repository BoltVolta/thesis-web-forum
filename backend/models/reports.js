const pool = require('../db/pool');
const reports = {
    findAll: () => new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err);

            const selectQuery = 'SELECT * FROM reports';
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

            const selectQuery = 'SELECT * FROM reports WHERE id=?';
            connection.query(selectQuery, id, (err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }),
    findByPostId: (id) => new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err);

            const selectQuery = 'SELECT * FROM reports WHERE post_id LIKE ?';
            connection.query(selectQuery, id, (err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }),
    save: (report) => new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err);

            const createQuery = 'INSERT INTO report SET ?';
            connection.query(createQuery, report, (err, result) => {
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

            const deleteQuery = 'DELETE FROM reports WHERE id=?';
            connection.query(deleteQuery, id, (err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }),
    deleteByPostId: (id) => new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                return reject(err);

            const deleteQuery = 'DELETE FROM reports WHERE post_id=?';
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
module.exports = reports;