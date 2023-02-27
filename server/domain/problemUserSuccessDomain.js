const db = require('../db');

problemUserSuccessDomain = {
    getPercentileNumbers() {
        
    },
    getPercentileQuery() {
        let query = 'select ';
        for (let i=0; i<99; i++) {
            query += `percentile_disc(${i/100}) within group (order by t.score), `;
        }
        query += 'percentile_disc(0.99) within group (order by t.score) ';
        query += 'from (SELECT user_id, count(*) score from problem_user_success group by user_id) t';
        return query;
    }
}

module.exports = problemAttemptsDomain;