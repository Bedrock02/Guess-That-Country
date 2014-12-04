var app = app || {};
app.EndGameView = Backbone.View.extend({
	events: {
		'click #restartGame' : 'restartApp'
	},
	el: '.container',

	endGameTmpl: _.template( $('#end-game-template').html() ),

	initialize: function (score) {
		this.totalScore = score;
		this.render();
	},
	render: function () {
		this.$el.html( this.endGameTmpl({score: this.totalScore}) );
	},
	remove: function () {
		this.undelegateEvents();
		this.$el.empty();
		this.stopListening();
		return this;
	},
	restartApp: function () {
		router.routeRequest('', true);
	}
});