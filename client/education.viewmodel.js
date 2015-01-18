var EducationViewModel = function () {
  this.view = ko.observable (false);

  this.collegeDate = ko.observable ('');
  this.collegeDescription = ko.observable ('');
  this.languages = ko.observable ('');
  this.computers = ko.observable ('');
};

EducationViewModel.prototype.render = function (data) {
  this.collegeDate (data.collegeDate);
  this.collegeDescription (data.collegeDescription);
  this.languages (data.languages);
  this.computers (data.computers);
};
