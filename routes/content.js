var path = require ('path');

var renderHome = module.exports.renderHome = function (req, res) {
  res.render (path.resolve ('views/index.ejs'));
};

var fourofour = module.exports.fourofour = function (req, res) {
  res.status (404).render (path.resolve ('views/404.ejs'));
};

var robots = module.exports.robots = function (req, res) {
  res.set ('Content-Type', 'text/plain');
  res.send (200, 'User-agent: Googlebot\nAllow: /\nUser-agent: *\nDisallow: /');
};

var linkedin = module.exports.linkedin = function (req, res) {
  res.redirect ('http://www.linkedin.com/in/alexjablon');
};

var github = module.exports.github = function (req, res) {
  res.redirect ('http://github.com/alexjab');
};

var npm = module.exports.npm = function (req, res) {
  res.redirect ('http://npmjs.org/~alexjab');
};

var _keybase = module.exports._keybase = function (req, res) {
  res.sendfile (__dirname + '/keybase/keybase.txt');
};

var keybase = module.exports.keybase = function (req, res) {
  res.redirect ('https://keybase.io/alexjab');
};

