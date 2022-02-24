const problemSelector = require('./selectors/problemSelector');
const auth = require('./auth');

let problem = {
    exec(id, code, req) {
        let conn = auth.getConnection(req);
        return problemSelector.getProblemDetails(id)
        .then(details => {
            let promiseList = [];
            details.TestCases.forEach(testCase => {
                let codeWithTests = code + '\n' + testCase;
                console.log('About to execute: ' + codeWithTests);
                promiseList.push(this.execSingle(conn, codeWithTests, testCase));
            });
            return Promise.all(promiseList);
        });
    },

    execSingle(conn, code, testCode) {
        return new Promise(function (resolve, reject) {
            conn.tooling.executeAnonymous(code, function(err, executeResponse) {
                if (err) { reject(err); }
                console.log('Execute response: ' + JSON.stringify(executeResponse));
                executeResponse.testCode = testCode;
                resolve(executeResponse);
            });
        });
    }
}

module.exports = problem;