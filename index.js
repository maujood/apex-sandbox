const express = require('express');
const path = require('path');
const cluster = require('cluster');
const jsforce = require('jsforce');
const PORT = process.env.PORT || 5000;
const oauth2 = new jsforce.OAuth2({
    loginUrl : 'https://login.salesforce.com',
    clientId : '3MVG9p1Q1BCe9GmBiGQu580Yt65a8Xb9wsWBZfDU2nGssyGAzq6EH1152hUc1UeAIXVdWwSg6nMhmq6X_UAQq',
    redirectUri : 'http://localhost:5000/logincallback'
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
        res.json({text: 'Logged in successfully!'});
    })
    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
}