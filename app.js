var express = require ('express');
var bodyParser = require ('body-parser');

var routes = require ('./routes');

var app = express ();

app.use (bodyParser.json());
app.use (bodyParser.urlencoded ({ extended: true }));

app.use ('/static/css', express.static (__dirname + '/static/css'));
app.use ('/static/img', express.static (__dirname + '/static/img'));
app.use ('/static/js', express.static (__dirname + '/static/js'));
app.use ('/static/fonts', express.static (__dirname + '/static/fonts'));
app.use ('/static/libs', express.static (__dirname + '/static/libs'));

app.get ('/api/resume', routes.api.getResume);
app.post ('/api/email', routes.api.postEmail);

app.get ('/', routes.content.renderHome);
app.get ('/robots.txt', routes.content.robots);
app.get ('/linkedin', routes.content.linkedin);
app.get ('/github', routes.content.github);
app.get ('/npm', routes.content.npm);
app.get ('/keybase', routes.content.keybase);
app.get ('/keybase.txt', routes.content._keybase);

app.get ('*', routes.content.fourofour);

module.exports = app;
