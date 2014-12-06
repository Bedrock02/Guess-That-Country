var app = app || {};
app.Users = Backbone.Collection.extend({
	model: app.User,
	url: '/api/users'
});