var crypto = require('crypto');
var _ = require('underscore');
var nodemailer = require("nodemailer");
var content = require("./content.js");
var gmailPassword = require ('./secrets').gmailPassword;
var redisAddr = process.env.REDIS_PORT_6379_TCP_ADDR;

// Redis stuff
// Redis is used to prevent mail flooding from a single ip address
var redis = require("redis"),
    client = redis.createClient('6379', redisAddr);

client.on("error", function (err) {
  console.log("Error " + err);
});

var render = exports.render = function (req, res) {
  res.sendfile(__dirname + '/static/views/resume.html');
};

var get_resume = exports.get_resume = function (req, res) {
  res.json (content);
};

var blob = exports.blob = function (req, res) {
  store_ip_hash (req.ip, function (redis_err, redis_res) {
    if (redis_err) {
      res.send ({ 'status': 0 });
    } else {
      if (redis_res === null) {
        res.send ({ 'status': 3 });
      } else {
        var from = req.body.blobFrom, content = req.body.blobContent;
        if (from && content) {
          send_email ({'from': from, 'content': content}, function (error) {
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

var store_ip_hash = exports.store_ip_hash = function (ip, callback) {
  var ip_h = crypto.createHash ('sha1').update (ip).digest ('hex').substring (0, 8);
  client.set(ip_h, 'OK', 'EX', 60, 'NX', function (err, res) {
    callback (err, res);
  });
};

var send_email = exports.send_email = function (data, callback) {
  var smtpTransport = nodemailer.createTransport ("SMTP", {
    service: "Gmail",
    auth: {
      user: "alexandre.jablon.resume@gmail.com",
      pass: gmailPassword
    }
  });
  var mailOptions = {
    from: "My Resume <alexandre.jablon.resume@gmail.com>",
    to: "alex+resume@jablon.me",
    subject: "Someone has sent you something from your resume",
    html: "<b>From:</b> " + data.from + "<br/><br/><b>Content:</b> <br/>" + data.content
  };
  smtpTransport.sendMail (mailOptions, callback);
};

var robots = exports.robots = function (req, res) {
  res.set ('Content-Type', 'text/plain');
  res.send (200, 'User-agent: Googlebot\nAllow: /\nUser-agent: *\nDisallow: /');
};

var fourofour = exports.fourofour = function (req, res) {
  res.status (404).sendfile(__dirname + '/static/views/404.html');
};

var linkedin = exports.linkedin = function (req, res) {
  res.redirect ('http://www.linkedin.com/in/alexjablon');
};

var github = exports.github = function (req, res) {
  res.redirect ('http://github.com/alexjab');
};

var npm = exports.npm = function (req, res) {
  res.redirect ('http://npmjs.org/~alexjab');
};
