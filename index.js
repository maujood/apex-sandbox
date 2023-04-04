const express = require('express');
const path = require('path');
const cluster = require('cluster');
const session = require('express-session');
const auth = require('./server/auth');
const db = require('./server/db');
const problemDomain = require('./server/domain/problemDomain');
const problemAttemptsDomain = require('./server/domain/problemAttemptsDomain');
const problemRunner = require('./server/problemRunner');
//const { json } = require('express');

const PORT = process.env.PORT;
const LOGIN_CALLBACK = process.env.LOGIN_CALLBACK;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ENV = process.env.ENV_NAME || 'production';
const SESSION_SECRET = process.env.SESSION_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;
const SITE_BASEURL = process.env.SITE_BASEURL;


if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} 
else {
    let app = express();

    app.use(express.static(path.join(__dirname, 'client/build')));
    app.use(express.json());

    auth.setOAuthInfo(CLIENT_ID, CLIENT_SECRET, LOGIN_CALLBACK);
    db.setPool(DATABASE_URL);

    if (ENV === 'production') {
        //app.set('trust proxy', 1) // trust first proxy
        //sess.cookie.secure = true // serve secure cookies
    }
    
    let sess = {
        store: new (require('connect-pg-simple')(session))({
            pool: db.getPool()
        }),
        secret: SESSION_SECRET,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
    }
      
    app.use(session(sess));
    
    app.get('/api/info', async function (req, res) {
        let userInfo = await auth.getUserInfo(req);
        res.json({data: userInfo});
    });

    app.get('/api/problemList', function (req, res) {
        problemDomain.getCategoriesWithProblems(auth.getDbUserId(req))
        .then((categoriesWithProblems) => {
            res.json(categoriesWithProblems);
        });
    });

    app.get('/api/easyPeasyProblems', async function (req, res) {
        problemDomain.getEasyPeasyProblems()
        .then((easyPeasyProblems) => {
            res.json(easyPeasyProblems);
        });
    });

    app.get('/api/latestProblems', function (req, res) {
        problemDomain.getLatestProblems()
        .then((latestProblems) => {
            res.json(latestProblems);
        });
    });

    app.get('/api/unsolvedProblems', function (req, res) {
        let dbUserId = auth.getDbUserId(req);
        if (dbUserId == null) {
            res.status(401).json({message: 'Unauthorized'});
            return;
        }
        problemDomain.getUnsolvedProblems(dbUserId)
        .then((unsolvedProblems) => {
            res.json(unsolvedProblems);
        });
    });

    app.get('/api/problem/view/:id', function(req, res) {
        problemDomain.getProblemDetails(req.params.id)
        .then((row) => {
            console.log('Problem Details: ' + JSON.stringify(row));
            res.json(row);
        })
        .catch(_ => {
            res.send('Error');
        });
    });

    app.post('/api/problem/create', function(req, res) {
        let problemDetails = req.body;
        problemDetails.ordinal = 1;
        let dbUserId = auth.getDbUserId(req);
        if (dbUserId == null) {
            res.status(401).json({message: 'Unauthorized'});
            return;
        }
        userDomain.userIsContributor(dbUserId)
        .then((isContributor) => {
            if (isContributor) {
                console.log('About to create problem: ' + JSON.stringify(problemDetails));
                return problemDomain.createProblem(problemDetails, dbUserId);
            }
            else {
                res.status(401).json({message: 'Unauthorized'});
            }
        })
        .then((row) => {
            res.json({ problem_id: row.id });
        })
        .catch(error => {
            console.log('Error happened: ' + JSON.stringify(error));
            res.status(500).json({message: 'error', error: error})
        });
    });

    app.post('/api/problem/edit', function(req, res) {
        let problemDetails = req.body;
        problemDetails.ordinal = 1;
        let dbUserId = auth.getDbUserId(req);
        if (dbUserId == null) {
            res.status(401).json({message: 'Unauthorized'});
            return;
        }
        userDomain.userIsContributor(dbUserId)
        .then((isContributor) => {
            if (isContributor) {
                console.log('About to create problem: ' + JSON.stringify(problemDetails));
                return problemDomain.editProblem(problemDetails);
            }
            else {
                res.status(401).json({message: 'Unauthorized'});
            }
        })
        .then(() => {
            res.json({ problem_id: problemDetails.id });
        })
        .catch(error => {
            console.log('Error happened: ' + JSON.stringify(error));
            res.status(500).json({message: 'error', error: error})
        });
    })

    app.post('/api/executeApex', function (req, res) {
        console.log('Body: ' + req.body.code);
        console.log('Problem ID: ' + req.body.problemId);
        problemRunner.exec(req.body.problemId, req.body.code, req)
        .then(execResult => {
            let success = false;
            let ms = 0;
            if (execResult.length > 0) success = execResult.every(_ => _.exceptionMessage?.includes('SuccessException'));
            if (success) {
                execResult.forEach((item) => {
                    let parsed = JSON.parse(item.exceptionMessage.substring(18));
                    ms += parsed.cpu;
                    item.success = true;
                });
            }
            else {
                execResult.forEach((item) => {
                    if (item.exceptionMessage?.includes('SuccessException')) {
                        item.success = true;
                    }
                });
            }
            problemAttemptsDomain.logAttempt(req, auth.getDbUserId(req), req.body.problemId, req.body.code, success, ms)
            .then((attemptDeets) => {
                let executeResponse = {
                    pointsUpdated: false,
                    execResult: execResult,
                    userInfo: {}
                }
                if (attemptDeets.newPoints !== null) {
                    executeResponse.pointsUpdated = true;
                    executeResponse.userInfo = auth.getUserInfo(req);
                }
                res.json(executeResponse);
            });
        })
        .catch(err => {
            console.log('Error executing: '+ JSON.stringify(err));
            if (err.message === 'Unauthorized') {
                //user needs to log in again
                auth.logout(req);
                res.status(401).json({message: 'Unauthorized'});
            }
            else if (err.name && err.name === 'invalid_grant') {
                auth.logout(req);
                res.status(401).json({message: 'Unauthorized'});
            }
            else {
                res.status(500).json(err);
            }
        });
    });
    
    app.get('/api/loginurl/:redir', function (req, res) {
        res.json({url: auth.getLoginUrl(req.params.redir)});
    });

    app.get('/logincallback', function (req, res) {
        //set access token and stuff in memory and return
        //res.json({text: 'Logged in successfully!'});
        auth.loginCallback(req, res)
        .then((redirectPath) => {
            res.redirect(SITE_BASEURL + redirectPath);
        })
        .catch((err) => {
            res.json({message: 'Error!', error: err});
        });
    });

    app.get('/api/logout', function (req, res) {
        auth.logout(req);
        res.json({status: 'success'});
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
    
    app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
}