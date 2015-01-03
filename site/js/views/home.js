var app = app || {};
app.HomeView = Backbone.View.extend({
	el: '.container-fluid',

	events: {
		'click #startApp': 'beginApp',
		'click #homeImage': 'meow'
	},
	template: 'home',

	initialize: function () {
		this.render();
	},
	beginApp: function () {
		router.routeRequest('begin', {trigger: true});
	},
	render: function () {
		app.TemplateManager.get(this.template, function(text) {
			this.$el.html( text );
		}.bind(this));
	},
	remove: function () {
		this.undelegateEvents();
		this.$el.empty();
		this.stopListening();
		return this;
	}
});