var SkillsViewModel = function () {
  this.skills = ko.observableArray ([]);
};

SkillsViewModel.prototype.render = function (data) {
  var lines = [];
  for (var i = 0; i < data.length; i++) {
    if (i % 4 === 0) {
      lines.push ([]);
    }
    lines[lines.length-1].push (data[i]);
  }
  this.skills (lines);
  $ (".tooltip-origin").tooltip ();
};
