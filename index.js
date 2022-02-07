const express = require('express');
const path = require('path');
const cluster = require('cluster');
const session = require('express-session');
const auth = require('./server/auth');
const db = require('./server/db');
const problemSelector = require('./server/selectors/problemSelector');
//const { json } = require('express');


const PORT = process.env.PORT;
const LOGIN_CALLBACK = process.env.LOGIN_CALLBACK;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ENV = process.env.ENV_NAME || 'production';
const SESSION_SECRET = process.env.SESSION_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;


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

    let sess = {
        secret: SESSION_SECRET,
        cookie: {}
    }

    auth.setOAuthInfo(CLIENT_ID, CLIENT_SECRET, LOGIN_CALLBACK);
    db.setPool(DATABASE_URL);

    if (ENV === 'production') {
        //app.set('trust proxy', 1) // trust first proxy
        sess.cookie.secure = true // serve secure cookies
    }
      
    app.use(session(sess));
    
    app.get('/api/info', function (req, res) {
        res.json({data: auth.getUserInfo(req)});
    });

    app.get('/api/problem', function(req, res) {
        problemSelector.getProblemDetails(1)
        .then((rows) => {
            console.log('Problem Details: ' + JSON.stringify(rows));
            res.json(rows[0]);
        })
        .catch(_ => {
            res.send('Error');
        });
    });
    
    app.get('/api/loginurl', function (req, res) {
        res.json({url: auth.getLoginUrl()});
    });

    app.post('/api/executeApex', function (req, res) {
        let apexBody = req.body;
        console.log('Body: ' + apexBody.code);
        let conn = auth.getConnection(req);
        conn.tooling.executeAnonymous(apexBody.code, function(err, executeResponse) {
            if (err) { return console.error(err); }
            console.log(JSON.stringify(executeResponse));
            res.json({
                status : executeResponse.success ? "Success" : "Failure",
                message : executeResponse.exceptionMessage ?? executeResponse.compileProblem
            });
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

    app.get('/db', async (req, res) => {
        try {
          const client = await pool.connect();
          const result = await client.query('SELECT * FROM test_table');
          const results = { 'results': (result) ? result.rows : null};
          res.render('pages/db', results );
          client.release();
        } catch (err) {
          console.error(err);
          res.send("Error " + err);
        }
      })

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
    
    app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
}