var AboutViewModel = function () {
  this.about = ko.observable ('');
};

AboutViewModel.prototype.render = function (data) {
  this.about (data);
};
