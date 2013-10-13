var express = require('express');
var resume = require('./resume.js');
var _ = require('underscore');
var app = express();

app.use('/static/css', express.static(__dirname + '/static/css'));
app.use('/static/img', express.static(__dirname + '/static/img'));
app.use('/static/js', express.static(__dirname + '/static/js'));
app.use('/static/fonts', express.static(__dirname + '/static/fonts'));
app.use('/static/views', express.static(__dirname + '/static/views'));
app.use('/static/libs', express.static(__dirname + '/static/libs'));

app.use(express.bodyParser());

app.get ('/', resume.render);

app.get ('/get_resume', resume.get_resume);

app.post ('/blob', resume.blob);

app.all ('/robots.txt', resume.robots);

app.all ('*', resume.fourofour);

app.listen(8000);
console.log('Listening on port 8000');
