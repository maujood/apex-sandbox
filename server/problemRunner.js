const problemDomain = require('./domain/problemDomain');
const auth = require('./auth');

let strException = `Integer cputime = System.Limits.getCpuTime();
throw new SuccessException('{"cpu":'+ cputime + '}');
class SuccessException extends Exception {}`;

let problemRunner = {
    exec(id, code, req) {
        let conn = auth.getConnection(req);
        return problemDomain.getProblemDetails(id)
        .then(details => {
            let promiseList = [];
            details.test_cases.forEach(testCase => {
                let codeWithTests = code + '\n' + testCase +'\n' + strException;
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
                //jsforce doesn't give access to the response code.
                //if executeResponse is empty, we will assume the user has been logged out.
                if (executeResponse == null || (executeResponse.name && executeResponse.name === 'invalid_grant')) {
                    reject({message: 'Unauthorized'});
                }
                else {
                    executeResponse.testCode = testCode;
                    resolve(executeResponse);
                }
            });
        });
    }
}

module.exports = problemRunner;