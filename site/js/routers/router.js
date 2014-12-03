var app = app || {};
var AppRouter = Backbone.Router.extend({
  routes: {
      '': 'index',
      'begin': 'getData',
      'end': 'endGame',
      '*actions': 'defaultRoute' // Backbone will try match the route above first
  },
  routeRequest: function (route, triggered) {
    this.view.remove();
    this.navigate(route,{trigger: triggered});
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
  },
  endGame: function () {
    console.log("lets end this game");
  }

});
var router = new AppRouter();
Backbone.history.start();