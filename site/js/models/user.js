var app = app || {};
app.User = Backbone.Model.extend({
	defaults: {
		username: 'UnknownName',
		highscore: '0'
	},
	parse: function ( response) {
		response.id = response._id;
		return response;
	}
});