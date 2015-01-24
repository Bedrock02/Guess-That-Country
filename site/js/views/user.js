var app = app || {};
app.UserView = Backbone.View.extend({
	tagName: 'li',
	className: 'list-group-item',
	template: _.template( $('#userTemplate').html() ),

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ));
		return this;
	}
});
