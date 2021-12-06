const express = require('express');
const path = require('path');
const cluster = require('cluster');
const jsforce = require('jsforce');
const PORT = process.env.PORT || 5000;
const REDIRECT_URL = process.env.REDIRECT_URL || 'http://localhost:5000/logincallback';
const CLIENT_ID = process.env.CLIENT_ID || '3MVG9p1Q1BCe9GmBiGQu580Yt65a8Xb9wsWBZfDU2nGssyGAzq6EH1152hUc1UeAIXVdWwSg6nMhmq6X_UAQq';
const oauth2 = new jsforce.OAuth2({
    loginUrl : 'https://login.salesforce.com',
    clientId : CLIENT_ID,
    redirectUri : LOGIN_CALLBACK
});

if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} 
else {
    express()
    .use(express.static(path.join(__dirname, 'client/build')))
    .get('/api/info', function (req, res) {
        res.json({data: 'Hello to the World from Worker ' + cluster.worker.id });
    })
    .get('/api/loginurl', function (req, res) {
        res.json({url: oauth2.getAuthorizationUrl({ scope : 'api' })});
    })
    .get('/logincallback', function (req, res) {
        //set access token and stuff in memory and return
        res.json({text: 'Logged in successfully!'});
    })
    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
}