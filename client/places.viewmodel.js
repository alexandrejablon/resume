var PlacesViewModel = function () {
  this.places = ko.observableArray ([]);
};

PlacesViewModel.prototype.render = function (data) {
  this.places (data);
};
