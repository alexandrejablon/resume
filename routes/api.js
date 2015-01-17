var crypto = require ('crypto');

var redis = require ('redis');
var nodemailer = require ('nodemailer');

var content = require ('../content.js');

var gmailPassword = process.env.GMAIL_PASSWORD;

var getResume = module.exports.getResume = function (req, res) {
  res.json (content);
};

var postEmail = module.exports.postEmail = function (req, res) {
  storeIpHash (req.ip, function (redis_err, redis_res) {
    if (redis_err) {
      res.send ({ 'status': 0 });
    } else {
      if (redis_res === null) {
        res.send ({ 'status': 3 });
      } else {
        var from = req.body.blobFrom, content = req.body.blobContent;
        if (from && content) {
          sendEmail ({'from': from, 'content': content}, function (error) {
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

var storeIpHash = module.exports.storeIpHash = function (ip, callback) {
  var ip_h = crypto.createHash ('sha1').update (ip).digest ('hex').substring (0, 8);
  client.set(ip_h, 'OK', 'EX', 60, 'NX', function (err, res) {
    callback (err, res);
  });
};

var sendEmail = module.exports.sendEmail = function (data, callback) {
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

