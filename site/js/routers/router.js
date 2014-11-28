var app = app || {};
var AppRouter = Backbone.Router.extend({
  routes: {
      '': 'index',
      'begin': 'getData',
      '*actions': 'defaultRoute' // Backbone will try match the route above first
  },
  routeRequest: function (route, trigger) {
    this.view.remove();
    this.navigate(route,trigger);
  },
  index: function () {
      if(this.view) {
        this.view.remove();
      }
      console.log('you are home');
      this.view = new app.HomeView();
  },
  getData: function () {
      this.view = new app.CountryView();
  }
});
var router = new AppRouter();
Backbone.history.start();