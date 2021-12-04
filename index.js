const express = require('express');
const path = require('path');
var cluster = require('cluster');
const PORT = process.env.PORT || 5000;

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
        .get('/', function (req, res) {
            res.send('Hello to the World from Worker ' + cluster.worker.id);
        })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
}