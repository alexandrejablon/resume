var ExperienceViewModel = function () {
  this.experiences = ko.observableArray ([]);
};

ExperienceViewModel.prototype.render = function (data) {
  this.experiences (data);
};
