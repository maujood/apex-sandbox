const { Pool } = require('pg');

let pool;

let db = {
    setPool(dbUrl) {
        pool = new Pool({
            connectionString: dbUrl,
            ssl: process.env.ENV_NAME === 'development' ? false : {
                rejectUnauthorized: false
            }
        });
    },
    getPool() {
        return pool;
    },
    exec(query) {
        return new Promise(function (resolve, reject) {
            let clientRef;
            pool.connect()
            .then((client) => {
                clientRef = client;
                return client.query(query);
            })
            .then((result) => {
                clientRef.release();
                resolve(result);
            })
        });
    },
    execWithParams(query, params) {
        return new Promise(function (resolve, reject) {
            let clientRef;
            pool.connect()
            .then((client) => {
                clientRef = client;
                return client.query(query, params);
            })
            .then((result) => {
                clientRef.release();
                resolve(result);
            })
        });
    }
}

module.exports = db;