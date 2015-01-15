var app = app || {};
app.EndGameView = Backbone.View.extend({

	events: {
		'click #restartGame' : 'restartApp',
		'click #submitScore' : 'addNewUser',
		'keypress input': 'checkSubmit'
	},
	el: '.container-fluid',

	template: 'end',

	initialize: function (results) {
		_.bindAll(this, 'renderCollection');
		this.totalScore = results.score;
		this.region = results.region;
		this.collection = new app.Users();
		this.collection.fetch({reset: true});

		this.listenTo( this.collection, 'reset', this.render );
	},
	checkSubmit: function (event) {
		if(event.which === 13) {
			this.addNewUser();
		}
	},
	addNewUser: function () {
		var name = this.$('#username').val();
		if(!name) { return; }
		var userData = {
			username: name,
			highscore: this.totalScore,
			region: this.region
		};
		this.collection.create( userData );
		this.userAdded = true;
		this.render();
	},
	render: function () {
		app.TemplateManager.get(this.template, function (text) {
			var template = _.template(text);
			this.$el.html( template({score: this.totalScore, group: this.region}) );
			this.renderCollection();
			if(this.userAdded) {
				this.$('.input-group').hide();
			}
		}.bind(this));
	},
	renderCollection: function () {
		var filteredCollection = this.collection.where({'region': this.region});
		this.collection = new app.Users( filteredCollection );
		this.collection.each(function( user ) {
			this.renderUser( user );
		}, this );
	},
	renderUser: function( user ) {
		var userView = new app.UserView({
			model: user
		});
		this.$('#scoreBoard').append( userView.render().el );
	},
	remove: function () {
		this.undelegateEvents();
		this.$el.empty();
		this.stopListening();
		return this;
	},
	restartApp: function () {
		router.routeRequest('', true);
	}
});