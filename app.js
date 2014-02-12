var express = require ('express');
var resume = require ('./resume.js');
var _ = require ('underscore');
var app = express ();

app.use (express.json ());
app.use (express.urlencoded ());

app.use ('/static/css', express.static (__dirname + '/static/css'));
app.use ('/static/img', express.static (__dirname + '/static/img'));
app.use ('/static/js', express.static (__dirname + '/static/js'));
app.use ('/static/fonts', express.static (__dirname + '/static/fonts'));
app.use ('/static/libs', express.static (__dirname + '/static/libs'));

app.use (app.router);
app.use (function (err, req, res, next) {
  if (!err) return next();
  var pub_error = {'error': 500, 'src': req.ip, 'url': req.url};
  var pri_error = {'error': err.stack, 'src': req.ip, 'url': req.url};
  console.log (pri_error);
  res.send (500, pub_error);
});

app.get ('/', resume.render);

app.get ('/get_resume', resume.get_resume);

app.post ('/blob', resume.blob);

app.get ('/robots.txt', resume.robots);

app.get ('/linkedin', resume.linkedin);

app.get ('*', resume.fourofour);

app.listen (8000);
console.log ('Listening on port 8000');
