var ContactViewModel = function () {
  this.showForm = ko.observable (false);
  this.statusText = ko.observable ('');
  this.showStatus = ko.observable (false);
  this.mailFrom = ko.observable ('');
  this.mailText = ko.observable ('');

  this.showFromError = ko.observable (false);
  this.fromErrorMessage = ko.observable ('');
  this.showTextError = ko.observable (false);
  this.textErrorMessage = ko.observable ('');
};

ContactViewModel.prototype.showSendMail = function () {
  if (this.showForm ()) {
    this.showForm (false);
  } else {
    this.showForm (true);
  }
};

ContactViewModel.prototype.sendMail = function () {
  var error = false;
  var from = this.mailFrom ();
  var text = this.mailText ();

  if (!from) {
    error = true;
    this.fromErrorMessage ('This field must not be empty!');
    this.showFromError (true);
  } else {
    this.fromErrorMessage ('');
    this.showFromError (false);
  }

  if (!text) {
    error = true;
    this.textErrorMessage ('This field must not be empty!');
    this.showTextError (true);
  } else {
    this.textErrorMessage ('');
    this.showTextError (false);
  }

  if (!error) {
    var data = {
      from: from,
      text: text
    };

    var that = this;
    that.showStatus (true);
    that.statusText ('<span class="blob-primary align-left">Sending...</span>');

    http.post ('/api/email', data, function (err, res) {
      var status = res.status;
      if (status === 1) {
        that.statusText ('<span class="blob-success align-left">Message sent, thank you!</span>');
      } else if (status === 2) {
        that.statusText ('<span class="blob-error align-left">At least one of the field is empty.</span>');
      } else if (status === 3) {
        that.statusText ('<span class="blob-primary align-left">Message not sent: please wait one minute before sending a message again</span>');
      } else {
        that.statusText ('<span class="blob-error align-left">An error happened.</span>');
      }
    });
  }
};
