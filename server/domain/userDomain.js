const db = require('../db');

userDomain = {
    //returns array of strings
    createOrGetUserRecord(username, email) {
        return db.execWithParams('SELECT id, username, email FROM public.users WHERE username = $1', [username])
            .then((result) => {
                console.log('User found: ' + JSON.stringify(result.rows));
                if (result.rows.length === 1) {
                    return result.rows[0];
                }
                else {
                    //if the user with the given username does not exist, create one
                    db.execWithParams('INSERT INTO users(username, email) VALUES($1, $2) RETURNING id, username, email', [username, email])
                    .then(() => {
                        return result.rows[0];
                    });
                }
            });
    }
}

module.exports = userDomain;