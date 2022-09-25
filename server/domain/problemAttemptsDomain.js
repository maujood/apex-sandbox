const db = require('../db');

problemAttemptsDomain = {
    logAttempt(userId, problemId, submittedCode, success, ms) {
        return new Promise((resolve, reject) => {
            Promise.resolve().then(() => {
                if (success) {
                    return db.execWithParams('INSERT INTO public.problem_user_success(user_id, problem_id) VALUES($1, $2) ON CONFLICT DO NOTHING', [userId, problemId]);
                }
                else return true;
            })
            .then(() => {
                return db.execWithParams('INSERT INTO public.problem_attempts(user_id, problem_id, submitted_code, success, exec_ms) VALUES($1, $2, $3, $4, $5) RETURNING id', [userId, problemId, submittedCode, success, ms]);
            })
            .then((result) => {
                resolve(result.rows[0]);
            })
            .catch((err) => {
                console.log('Error inserting problem attempt: ' + JSON.stringify(err));
                reject(err);
            });
        });
    }
}

module.exports = problemAttemptsDomain;