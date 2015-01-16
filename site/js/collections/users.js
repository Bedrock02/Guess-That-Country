var app = app || {};
app.Users = Backbone.Collection.extend({
	model: app.User,
	url: '/api/users',
	limit: 10,
	initialize: function() {
		_.bindAll(this, 'filterByRegion', 'limitCollection');
	},
	filterByRegion: function(region) {
		var filteredList = this.filter(function(user){
			return user.get('region') === region;
		});

		return new app.Users(filteredList);
	},
	limitCollection: function() {
		var limitedCollection = this.first(this.limit);
		return new app.Users(limitedCollection);
	},
	comparator: function(model) {
		return -model.get("highscore");
	}
});