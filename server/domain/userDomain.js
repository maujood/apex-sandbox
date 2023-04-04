const db = require('../db');
const percentiles = require('../utils/percentiles');
const cache = require('../utils/cache');

userDomain = {
    //returns array of strings
    createOrGetUserRecord(username, email) {
        return new Promise(function (resolve, reject) {
            db.execWithParams('SELECT id, username, email, points FROM public.users WHERE email = $1', [email])
            .then((result) => {
                console.log('User found: ' + JSON.stringify(result.rows));
                if (result.rows.length === 1) {
                    resolve(result.rows[0]);
                }
                else {
                    //if the user with the given email does not exist, create one
                    db.execWithParams('INSERT INTO users(username, email) VALUES($1, $2) RETURNING id, username, email, points', [username, email])
                    .then((result) => {
                        resolve(result.rows[0]);
                    });
                }
            });
        });
    },

    userIsContributor(dbUserId) {
        return new Promise((resolve, reject) => {
            db.execWithParams('SELECT contributor FROM users WHERE id = $1', [dbUserId])
            .then((result) => {
                console.log('contributor: ' + JSON.stringify(result));
                if (result.rows == null || result.rows.length === 0) resolve(false);
                resolve(result.rows[0].contributor === "1" ? true : false);
            });
        });
    },

    getPercentileValueForPoints(points) {
        return this.getPercentileNumbers()
        .then((plist) => {
            return percentiles.calculatePercentiles(points, plist);
        });
    },

    getPercentileNumbers() {
        return new Promise((resolve, reject) => {
            if (cache.hasValue('percentiles')) {
                resolve(cache.getIfAvailable('percentiles'));
            }
            db.exec(this.getPercentileQuery())
            .then((result) => {
                let percentiles = [];
                for (let i=1; i<=99; i++) {
                    percentiles.push(result.rows[0][`p${i}`]);
                }
                cache.set('percentiles', percentiles, 1000 * 60 * 60);
                resolve(percentiles);
            });
        });
        
    },

    getPercentileQuery() {
        let query = 'select ';
        for (let i=1; i<99; i++) {
            query += `percentile_disc(${i/100}) within group (order by t.points) as p${i}, `;
        }
        query += 'percentile_disc(0.99) within group (order by t.points) as p99 ';
        query += 'from (SELECT id, points from users) t';
        return query;
    },
}

module.exports = userDomain;