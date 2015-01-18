var http = {};

http.get = function (url, callback) {
  return $.ajax ({
    type: 'GET',
    url: url,
      success: function (data) {
      callback (null, data);
    },
    error: function (error) {
      callback (error, null);
    }
  });
};

http.post = function (url, data, callback) {
  return $.ajax ({
    type: 'POST',
    url: url,
    data: data,
    success: function (data) {
      callback (null, data);
    },
    error: function (error) {
      callback (error, null);
    }
  });
};
