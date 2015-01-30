var app = app || {};
app.DifficultyView = Backbone.View.extend({
	el: '.container-fluid',

	template: 'difficulty',

	events: {
		'click .list-group a': 'selection'
	},

	initialize: function (region){
		this.data = region;
		this.render();
	},
	selection: function (e) {
		e.preventDefault();
		var mode = $(e.target).attr('data-mode');
		router.routeRequest('begin/' + this.data + '/' + mode, true);
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
