var should = require ('should');
var resume = require ('../resume.js');
var redis = require ('redis');
    client = redis.createClient ();

describe ('resume.js', function () {
  after (function (done) {
    client.flushall (function (err, res) {
      client.quit ();
      done ();
    });
  });

  describe ('get_resume ()', function () {
    it ('should res a JSON describing my resume', function (done) {
      var req = {};
      var res = {
        json: function (actual) {
          actual.should.have.properties('status', 'education', 'career', 'projects', 'interests', 'now', 'places', 'this_site', 'contact');
          done ();
        }
      };
      resume.get_resume (req, res);
    });
  });

  describe ('store_ip_hash ()', function () {
    it ('should store an IP hash', function (done) {
      var ip = '127.0.0.1';
      resume.store_ip_hash (ip, function (err, res) {
        (err === null).should.be.true;
        res.should.eql ('OK');
        done ();
      });
    });
  });

});
