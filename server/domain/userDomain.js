const db = require('../db');

userDomain = {
    //returns array of strings
    createOrGetUserRecord(username, email) {
        return new Promise(function (resolve, reject) {
            db.execWithParams('SELECT id, username, email FROM public.users WHERE email = $1', [email])
            .then((result) => {
                console.log('User found: ' + JSON.stringify(result.rows));
                if (result.rows.length === 1) {
                    resolve(result.rows[0]);
                }
                else {
                    //if the user with the given email does not exist, create one
                    db.execWithParams('INSERT INTO users(username, email) VALUES($1, $2) RETURNING id, username, email', [username, email])
                    .then(() => {
                        resolve(result.rows[0]);
                    });
                }
            });
        });
    }
}

module.exports = userDomain;