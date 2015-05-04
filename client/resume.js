var ResumeViewModel = function () {
  this.educationViewModel = new EducationViewModel ();
  this.experienceViewModel = new ExperienceViewModel ();
  this.skillsViewModel = new SkillsViewModel ();
  this.projectsViewModel = new ProjectsViewModel ();
  this.nowViewModel = new NowViewModel ();
  this.placesViewModel = new PlacesViewModel ();
  this.interestsViewModel = new InterestsViewModel ();
  this.contactViewModel = new ContactViewModel ();

  this.getResumeData ();
};

ResumeViewModel.prototype.getResumeData = function () {
  var that = this;

  http.get ('/api/resume', function (err, res) {
    if (!err) {
      that.educationViewModel.render (res.education);
      that.experienceViewModel.render (res.experience);
      that.skillsViewModel.render (res.skills);
      that.nowViewModel.render (res.now);
      that.placesViewModel.render (res.places);
      that.projectsViewModel.render (res.projects);
      that.interestsViewModel.render (res.interests);
    }
  });
};

ko.applyBindings (new ResumeViewModel ());

