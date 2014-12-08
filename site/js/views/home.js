var app = app || {};
app.HomeView = Backbone.View.extend({
	el: '.container',

	events: {
		'click #startApp': 'beginApp',
		'click #homeImage': 'meow'
	},

	homeTmpl: _.template( $('#homeView').html() ),

	initialize: function () {
		this.render();
	},
	beginApp: function () {
		router.routeRequest('begin', {trigger: true});
	},
	render: function () {
		this.$el.html( this.homeTmpl() );
	},
	remove: function () {
		this.undelegateEvents();
		this.$el.empty();
		this.stopListening();
		return this;
	}
});