const db = require('../db');

problemDomain = {
    //returns array of strings
    getCategories() {
            return db.exec('SELECT title category FROM problem_categories')
            .then((result) => {
                return result.rows;
            });
    },

    getProblemList(userId) {
        return db.execWithParams('SELECT p.id id, p.title title, c.title category, COALESCE(s.success, 0) success ' +
            'FROM public.problems p ' +
            '    LEFT JOIN (SELECT 1 success, problem_id from public.problem_user_success where user_id = $1) s ON ' + 
   	        '        s.problem_id = p.id ' + 
            '    INNER JOIN public.problem_categories c ON ' +
            '        p.category_id = c.id ' +
            'WHERE active = true ' +
            'ORDER BY c.ordinal, p.ordinal', [userId])
            .then((result) => {
                return result.rows;
            });
    },

    getEasyPeasyProblems() {
        return db.exec('SELECT id, title FROM problems WHERE active = true AND category_id = 1 ORDER BY Ordinal LIMIT 10')
            .then((result) => {
                return result.rows;
            });
    },

    getLatestProblems() {
        return db.exec('SELECT id, title FROM problems WHERE active = true ORDER BY id DESC LIMIT 10')
            .then((result) => {
                return result.rows;
            });
    },

    getUnsolvedProblems(userId) {
        return db.execWithParams('SELECT id, title FROM ' +
            '    (SELECT DISTINCT ON (p.id) p.id id, p.title title, p.active active, pa.id attempt_id ' +
            '    FROM problem_attempts pa INNER JOIN problems p ON pa.problem_id = p.id ' +
            '    WHERE pa.user_id = $1 ' +
            '    ORDER BY p.id DESC) t ' +
            'WHERE active = true AND id NOT IN ' +
            '    (SELECT DISTINCT problem_id FROM problem_user_success WHERE user_id = $2) ' +
            'ORDER BY attempt_id DESC LIMIT 10'
        , [userId, userId])
        .then((result) => {
            return result.rows;
        });
    },

    getProblemDetails(problemId) {
        return db.execWithParams('SELECT p.id id, p.title title, problem_statement, c.info_identifier info_identifier, method, hints, test_cases, u.name, u.url ' + 
                'FROM problems p left join users u on p.contributor_id = u.id ' + 
                '  left join problem_categories c on p.category_id = c.id ' +
                'WHERE p.id = $1'
            , [problemId])
            .then((result) => {
                return result.rows[0];
            });
    },

    createProblem(problemJson, userId) {
        return db.execWithParams('INSERT INTO public.problems(' +
            'title, problem_statement, method, hints, test_cases, category_id, ordinal, contributor_id) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ' +
            'RETURNING id;',
            [
                problemJson.title,
                problemJson.problem_statement,
                problemJson.method,
                problemJson.hints,
                problemJson.test_cases,
                problemJson.category_id,
                problemJson.ordinal,
                userId
            ])
        .then((result) => {
            return result.rows[0];
        });
    },

    editProblem(problemJson) {
        return db.execWithParams('UPDATE public.problems ' +
        'SET title=$1, problem_statement=$2, method=$3, hints=$4, test_cases=$5, category_id=$6 ' +
        'WHERE id = $7;', [
            problemJson.title,
            problemJson.problem_statement,
            problemJson.method,
            problemJson.hints,
            problemJson.test_cases,
            problemJson.category_id,
            problemJson.id
        ]);
    },

    getCategoriesWithProblems(userId) {
        return this.getProblemList(userId)
            .then(function (problems) {
                let categoryList = [];
                let categoryObj = {category: ''};
                for (let i=0; i<problems.length; i++) {
                    let p = problems[i];
                    if (p.category !== categoryObj.category) {
                        //a new category is starting. Create a new category object.
                        categoryObj = {
                            category: p.category,
                            problems: []
                        }
                        categoryList.push(categoryObj);
                    }
                    categoryObj.problems.push(p);
                }

                return categoryList;
            });
    }
}

module.exports = problemDomain;