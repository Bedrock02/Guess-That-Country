var app = app || {};
app.RegionView = Backbone.View.extend({
	el: '.container-fluid',

	template: 'region',

	events: {
		'click .list-group a': 'selection'
	},

	initialize: function () {
		this.render();
	},
	selection: function (e) {
		e.preventDefault();
		router.routeRequest('begin/' + e.target.text, true);
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