var ExperienceViewModel = function () {
  this.experiences = ko.observableArray ([]);
  this.showMore = ko.observable (false);
  this.showButtonText = ko.observable ('Show more...');
  this.showButtonChevron = ko.observable ('glyphicon glyphicon-chevron-down');
};

ExperienceViewModel.prototype.render = function (data) {
  this.experiences (data);
};

ExperienceViewModel.prototype.toggleShowMore = function () {
  if (!this.showMore ()) {
    this.showMore (true);
    this.showButtonText ('Show less');
    this.showButtonChevron ('glyphicon glyphicon-chevron-up');
  } else {
    this.showMore (false);
    this.showButtonText ('Show more...');
    this.showButtonChevron ('glyphicon glyphicon-chevron-down');
  }
};
