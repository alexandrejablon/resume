var NowViewModel = function () {
  this.imageName = ko.observable ('');
  this.imageTitle = ko.observable ('');
  this.imageAlt = ko.observable ('');
  this.description = ko.observable ('');
};

NowViewModel.prototype.render = function (data) {
  this.imageName (data.image.name);
  this.imageTitle (data.image.title);
  this.imageAlt (data.image.alt);
  this.description (data.description);
};
