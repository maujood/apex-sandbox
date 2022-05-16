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

    getProblemDetails(problemId) {
        return db.execWithParams('SELECT id, title, problem_statement, method, hints, test_cases FROM problems WHERE id = $1', [problemId])
            .then((result) => {
                return result.rows[0];
            });
    },

    createProblem(problemJson, userId) {
        return db.execWithParams('INSERT INTO public.problems(' +
            'title, problem_statement, method, hints, test_cases, category_id, ordinal, contributor_id) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8); ' +
            'RETURNING id',
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
            porblemJson.test_cases,
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