var express = require ('express');

var _ = require ('underscore');

var routes = require ('./routes.js');
var conf = require ('./conf.js');

var app = express ();

app.use (express.json ());
app.use (express.urlencoded ());

app.use ('/static/css', express.static (__dirname + '/static/css'));
app.use ('/static/img', express.static (__dirname + '/static/img'));
app.use ('/static/js', express.static (__dirname + '/static/js'));
app.use ('/static/fonts', express.static (__dirname + '/static/fonts'));
app.use ('/static/libs', express.static (__dirname + '/static/libs'));

app.get ('/', routes.render);
app.get ('/get_resume', routes.get_resume);
app.post ('/blob', routes.blob);
app.get ('/robots.txt', routes.robots);
app.get ('/linkedin', routes.linkedin);
app.get ('/github', routes.github);
app.get ('/npm', routes.npm);
app.get ('/keybase.txt', routes.keybase_txt);
app.get ('/keybase', routes.keybase);

app.get ('*', routes.fourofour);

app.listen (conf.server.port);
console.log ('Resume listening on port '+conf.server.port);
