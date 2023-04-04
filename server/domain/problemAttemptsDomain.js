const db = require('../db');
const auth = require('../auth.js');

problemAttemptsDomain = {
    async logAttempt(req, userId, problemId, submittedCode, success, ms) {
        let returnObj = {
            newPoints: null
        };
        try {
            if (success) {
                let currentSuccess = await db.execWithParams('SELECT COUNT(*) count FROM public.problem_user_success WHERE user_id = $1 AND problem_id = $2', [userId, problemId]);
                let alreadyCompleted = currentSuccess.rows[0].count === '1';
                if (!alreadyCompleted) {
                    // increase user score, log success attempt
                    await db.execWithParams('INSERT INTO public.problem_user_success(user_id, problem_id) VALUES($1, $2) ON CONFLICT DO NOTHING', [userId, problemId]);
                    let pointsResult = await db.execWithParams('SELECT points FROM public.problems WHERE id = $1', [problemId]);
                    let points = parseInt(pointsResult.rows[0].points);

                    // update users table
                    let updatedPointsResult = await db.execWithParams('UPDATE users SET points = points + $1 WHERE Id = $2 RETURNING points', [points, userId]);
                    let newPoints = parseInt(updatedPointsResult.rows[0].points);
                    returnObj.newPoints = newPoints;

                    // set points and percentile on UI
                    await auth.updateUserPointsInSession(req, newPoints);
                }
            }
            await db.execWithParams('INSERT INTO public.problem_attempts(user_id, problem_id, submitted_code, success, exec_ms) VALUES($1, $2, $3, $4, $5) RETURNING id', [userId, problemId, submittedCode, success, ms]);

        }
        catch (err) {
            console.log('Error inserting problem attempt: ' + JSON.stringify(err));
        }
        return returnObj;
    },
    getUserSolvedProblems(userId) {
        return db.execWithParams('select count(*) from problem_user_success where user_id = $1', [userId])
        .then((result) => {
            return result.rows;
        });
    }
}

module.exports = problemAttemptsDomain;