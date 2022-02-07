const { Pool } = require('pg');

let pool;

let db = {
    setPool(dbUrl) {
        pool = new Pool({
            connectionString: dbUrl,
            ssl: {
                rejectUnauthorized: false
            }
        });
    },
    exec(query) {
        return new Promise(function (resolve, reject) {
            pool.connect()
            .then((client) => {
                return client.query(query);
            })
            .then((result) => {
                resolve(result);
            })
        });
    },
    execWithParams(query, params) {
        return new Promise(function (resolve, reject) {
            pool.connect()
            .then((client) => {
                return client.query(query, params);
            })
            .then((result) => {
                resolve(result);
            })
        });
    }
}

module.exports = db;