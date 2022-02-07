const db = require('../db');

problemSelector = {
    //returns array of strings
    getCategories() {
        return new Promise((resolve, reject) => {
            db.exec('SELECT DISTINCT "Category" FROM problems WHERE "Active" = true')
            .then((result) => {
                resolve(result.rows);
            });
        });
    },

    getProblemList() {
        return new Promise((resolve, reject) => {
            db.exec('SELECT "Id", "Title", "Category" FROM problems WHERE "Active" = true ORDER BY "Category"')
            .then((result) => {
                resolve(result.rows);
            });
        });
    },

    getProblemDetails(problemId) {
        return new Promise((resolve, reject) => {
            db.execWithParams('SELECT "Id", "Title", "ProblemStatement", "Method", "Hints", "TestCases" FROM problems WHERE "Active" = true AND "Id" = $1', [problemId])
            .then((result) => {
                resolve(result.rows);
            });
        });
    }
}

module.exports = problemSelector;