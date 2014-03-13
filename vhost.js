var vhost = module.exports = function (req, res, next) {
  if (process.env.NODE_ENV !== 'dev' && req.headers.host !== 'alex.jablon.me') {
    res.redirect ('http://alex.jablon.me');
  } else {
    next ();
  }
}
