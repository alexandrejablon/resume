var InterestsViewModel = function () {
  this.interests = ko.observable ('');
};

InterestsViewModel.prototype.render = function (data) {
  this.interests (data);
};
