var app = app || {};
var AppRouter = Backbone.Router.extend({
  routes: {
      '': 'index',
      'begin': 'getData',
      'end/:score': 'endGame',
      '*actions': 'defaultRoute' // Backbone will try match the route above first
  },
  routeRequest: function (route, triggered) {
    this.view.remove();
    this.navigate(route,{trigger: triggered});
  },
  index: function () {
      this.view = new app.HomeView();
  },
  getData: function () {
      this.view = new app.CountryView();
  },
  endGame: function (score) {
    this.view = new app.EndGameView(score);
  }

});
var router = new AppRouter();
Backbone.history.start();