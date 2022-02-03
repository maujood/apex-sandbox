const express = require('express');
const path = require('path');
const cluster = require('cluster');
const jsforce = require('jsforce');
const session = require('express-session');
const auth = require('./server/auth');
const { json } = require('express');
//const { default: auth } = require('./server/auth');

const PORT = process.env.PORT;
const LOGIN_CALLBACK = process.env.LOGIN_CALLBACK;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ENV = process.env.ENV_NAME || 'production';
const SESSION_SECRET = process.env.SESSION_SECRET;

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

    let sess = {
        secret: SESSION_SECRET,
        cookie: {}
    }

    auth.setOAuthInfo(CLIENT_ID, CLIENT_SECRET, LOGIN_CALLBACK);
      
    if (ENV === 'production') {
        //app.set('trust proxy', 1) // trust first proxy
        sess.cookie.secure = true // serve secure cookies
    }
      
    app.use(session(sess));
    
    app.get('/api/info', function (req, res) {
        res.json({data: auth.getUserInfo(req)});
    });
    
    app.get('/api/loginurl', function (req, res) {
        res.json({url: auth.getLoginUrl()}); 
    });

    app.get('/api/executeApex', function (req, res) {
        let apexBody = "System.debug('Hello, World');";
        let conn = auth.getConnection(req);
        conn.tooling.executeAnonymous(apexBody, function(err, executeResponse) {
            if (err) { return console.error(err); }
            console.log(JSON.stringify(executeResponse));
            res.json({status : executeResponse.success ? "Success" : "Failure"});
        });
    });

    app.get('/logincallback', function (req, res) {
        //set access token and stuff in memory and return
        //res.json({text: 'Logged in successfully!'});
        auth.loginCallback(req, res);
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