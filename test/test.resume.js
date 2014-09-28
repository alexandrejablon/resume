var should = require ('should');
var routes = require ('../routes.js');
var redis = require ('redis');
    client = redis.createClient ();

describe ('routes.js', function () {
  after (function (done) {
    client.flushall (function (err, res) {
      client.quit ();
      done ();
    });
  });

  describe ('Methods', function () {
    it ('should have the require methods', function () {
      routes.should.have.property ('render');
      routes.should.have.property ('get_resume');
      routes.should.have.property ('blob');
      routes.should.have.property ('store_ip_hash');
      routes.should.have.property ('send_email');
      routes.should.have.property ('_robots');
      routes.should.have.property ('fourofour');
      routes.should.have.property ('linkedin');
      routes.should.have.property ('npm');
      routes.should.have.property ('github');
      routes.should.have.property ('_keybase');
      routes.should.have.property ('keybase');
    });
  });

  describe ('get_resume ()', function () {
    it ('should res a JSON describing my resume', function (done) {
      var req = {};
      var res = {
        json: function (actual) {
          actual.should.have.properties('status', 'education', 'experience', 'projects', 'interests', 'now', 'places');
          done ();
        }
      };
      routes.get_resume (req, res);
    });
  });

  describe ('store_ip_hash ()', function () {
    it ('should store an IP hash', function (done) {
      var ip = '127.0.0.1';
      routes.store_ip_hash (ip, function (err, res) {
        (err === null).should.be.true;
        res.should.eql ('OK');
        done ();
      });
    });
  });

});
