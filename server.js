// Redis is used to prevent mail flooding from a single ip address
var redis = require ("redis");
var client = redis.createClient ('6379');

var app = require ('./app.js');

var config = require ('./config.js');

app.listen (config.server.port);
console.log ('Résumé listening on port '+config.server.port);
