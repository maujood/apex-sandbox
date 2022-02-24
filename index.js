const express = require('express');
const path = require('path');
const cluster = require('cluster');
const session = require('express-session');
const auth = require('./server/auth');
const db = require('./server/db');
const problemSelector = require('./server/selectors/problemSelector');
const problem = require('./server/problem');
//const { json } = require('express');


const PORT = process.env.PORT;
const LOGIN_CALLBACK = process.env.LOGIN_CALLBACK;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ENV = process.env.ENV_NAME || 'production';
const SESSION_SECRET = process.env.SESSION_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;
const SITE_BASEURL = process.env.SITE_BASEURL


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
    
    app.get('/api/info', function (req, res) {
        res.json({data: auth.getUserInfo(req)});
    });

    app.get('/api/problem/:id', function(req, res) {
        problemSelector.getProblemDetails(req.params.id)
        .then((row) => {
            console.log('Problem Details: ' + JSON.stringify(row));
            res.json(row);
        })
        .catch(_ => {
            res.send('Error');
        });
    });

    app.post('/api/executeApex', function (req, res) {
        console.log('Body: ' + req.body.code);
        console.log('Problem ID: ' + req.body.problemId);
        problem.exec(req.body.problemId, req.body.code, req)
        .then(execResult => {
            console.log(JSON.stringify(execResult));
            res.json(execResult);
        })
        .catch(err => {
            console.log('Error executing: '+ JSON.stringify(err));
            res.json(err);
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