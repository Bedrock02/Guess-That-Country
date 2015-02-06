var app = app || {};
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'begin/:region/:difficulty': 'getData',
    'region': 'selectRegion',
		'difficulty/:region': 'selectDifficulty',
    'end/:score/:group': 'endGame'
  },
  routeRequest: function (route, triggered) {
    this.view.remove();
    this.navigate(route,{trigger: triggered});
  },
  index: function () {
    this.view = new app.HomeView();
  },
  getData: function (region, mode) {
    this.view = new app.CountryView({'region':region, 'mode':mode});
  },
  endGame: function (score, group) {
    this.view = new app.EndGameView({'score':score, 'region':group});
    this.navigate('end', {trigger: false});
  },
  selectRegion: function () {
    this.view = new app.RegionView();
  },
  selectDifficulty: function (region) {
		this.view = new app.DifficultyView(region);
	}
});
var router = new AppRouter();
Backbone.history.start();
