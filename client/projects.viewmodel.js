var ProjectsViewModel = function () {
  this.projects = ko.observableArray ([]);
};

ProjectsViewModel.prototype.render = function (data) {
  this.projects (data);
};
