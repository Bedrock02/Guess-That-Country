var app = app || {};
app.Countries = Backbone.Collection.extend({
	model: app.Country,
	url: '/api/countries'
});