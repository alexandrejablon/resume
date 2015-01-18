var app = require ('./app.js');

var config = require ('./config.js');

app.listen (config.server.port);
console.log ('Résumé listening on port '+config.server.port);
