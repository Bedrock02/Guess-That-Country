var app = app || {};
app.Country = Backbone.Model.extend({
	defaults: {
		name: 'UnknownName',
		imgPath:'UnknownPath'
	},
	parse: function ( response ) {
		response.id = response._id;
		return response;
	}

});