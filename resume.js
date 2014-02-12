var _ = require('underscore');
var nodemailer = require("nodemailer");
var content = require("./content.js");
var crypto = require('crypto');
var _pass = require ('./_pass.js');


// Redis stuff
// Redis is used to prevent mail flooding from a single ip address
var redis = require("redis"),
  client = redis.createClient('6379', 'localhost');

client.on("error", function (err) {
  console.log("Error " + err);
});


// Exports stuff
exports.render = function (req, res) {
  res.sendfile(__dirname + '/static/views/resume.html');
};

exports.get_resume = function (req, res) {
  res.json (content.resume);
};

exports.blob = function (req, res) {
  // I know md5 is crap, but it's good enough for this kind of usage
  var mdsum = crypto.createHash('md5');
  var ipHash = mdsum.digest('ascii');
  client.set(ipHash, req.ip, 'EX', 60, 'NX', function (redisErr, redisRes) {
    if (redisErr) {
      res.send ({ 'status': 0 });
    } else {
      if (redisRes === null) {
	res.send ({ 'status': 3 });
      } else {
	if (req.body.blobFrom && req.body.blobContent) {
	  var smtpTransport = nodemailer.createTransport ("SMTP", {
	    service: "Gmail",
	    auth: {
	      user: "alexandre.jablon.resume@gmail.com",
	      pass: _pass ()
	    }
	  });

	  var mailOptions = {
	    from: "My Resume <alexandre.jablon.resume@gmail.com>",
	    to: "alex+resume@jablon.me",
	    subject: "Someone has sent you something from your resume",
	    html: "<b>From:</b> " + req.body.blobFrom + "<br/><br/><b>Content:</b> <br/>" + req.body.blobContent
	  }

	  smtpTransport.sendMail (mailOptions, function (error, response) {
	    if (error) {
	      res.send ({ 'status': 0 });
	    } else {
	      res.send ({ 'status': 1 });
	    }
	  });
	} else {
	  res.send ({'status': 2});
	}
      }
    }
  });
};

exports.robots = function (req, res) {
  res.set ('Content-Type', 'text/plain');
  res.send (200, 'User-agent: Googlebot\nAllow: /\nUser-agent: *\nDisallow: /');
};

exports.fourofour = function (req, res) {
  res.status (404).sendfile(__dirname + '/static/views/404.html');
};

exports.linkedin = function (req, res) {
  res.redirect ('http://www.linkedin.com/in/alexjablon');
}

exports.github = function (req, res) {
  res.redirect ('http://github.com/alexandrejablon');
}
