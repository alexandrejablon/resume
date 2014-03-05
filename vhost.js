var vhost = module.exports = function (req, res, next) {
  if (req.headers.host !== 'alex.jablon.me') {
    res.redirect ('http://alex.jablon.me');
  } else {
    next ();
  }
}
