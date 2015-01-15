var app = app || {};
var AppRouter = Backbone.Router.extend({
  routes: {
      '': 'index',
      'begin/:region': 'getData',
      'region': 'selectRegion',
      'end/:score/:group': 'endGame',
  },
  routeRequest: function (route, triggered) {
    this.view.remove();
    this.navigate(route,{trigger: triggered});
  },
  index: function () {
    this.view = new app.HomeView();
  },
  getData: function (region) {
    this.view = new app.CountryView(region);
  },
  endGame: function (score, group) {
    this.view = new app.EndGameView({'score':score, 'region':group});
    this.navigate('end', {trigger: false});
  },
  selectRegion: function () {
    this.view = new app.RegionView();
  }

});
var router = new AppRouter();
Backbone.history.start();