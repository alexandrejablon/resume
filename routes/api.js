var crypto = require ('crypto');

var async = require ('async');

// Redis is used to prevent mail flooding from a single ip address
var redis = require ('redis');
var client = redis.createClient ('6379');

var nodemailer = require ('nodemailer');

var content = require ('../content.js');

var gmailPassword = process.env.GMAIL_PASSWORD;

var getResume = module.exports.getResume = function (req, res) {
  res.json (content);
};

var postEmail = module.exports.postEmail = function (req, res) {
  var from = req.body.from;
  var text = req.body.text;
  async.waterfall ([
    function (next) {
      if (!from || !text) {
        next (new Error ('Missing from or text'));
      } else {
        next (null);
      }
    },
    function (next) {
      storeIpHash (req.ip, function (err, res) {
        next (err, res);
      });
    },
    function (stored, next) {
      if (!stored) {
        next (null, null);
      } else {
        sendEmail ({ 'from': from, 'text': text }, function (error, info) {
          next (error, stored, info);
        });
      }
    }
  ], function (error, stored, info) {
    if (error) {
      if (error.toString () === 'Error: Missing from or text') {
        res.send ({ 'status': 2 });
      } else {
        res.send ({ 'status': 0 });
      }
    } else if (!stored) {
      res.send ({ 'status': 3 });
    } else {
      res.send ({ 'status': 1 });
    }
  });
};

var storeIpHash = module.exports.storeIpHash = function (ip, callback) {
  var ipHash = crypto.createHash ('sha1').update (ip).digest ('hex').substring (0, 8);
  client.set (ipHash, 'OK', 'EX', 60, 'NX', function (err, res) {
    callback (err, res);
  });
};

var sendEmail = module.exports.sendEmail = function (data, callback) {
  var transporter = nodemailer.createTransport ({
    service: 'Gmail',
    auth: {
      user: 'alexandre.jablon.resume@gmail.com',
      pass: gmailPassword 
    }
  });
  var mailOptions = {
    from: 'My Resume <alexandre.jablon.resume@gmail.com>',
    to: 'alex+resume@jablon.me',
    subject: 'Someone has sent you something from your resume',
    html: '<b>From:</b> ' + data.from + '<br/><br/><b>Content:</b> <br/>' + data.text
  };
  transporter.sendMail (mailOptions, function (error, info) {
    callback (error, info);
  });
};

