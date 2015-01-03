var app = app || {};
app.EndGameView = Backbone.View.extend({

	events: {
		'click #restartGame' : 'restartApp',
		'click #submitScore' : 'addNewUser',
		'keypress input': 'checkSubmit'
	},
	el: '.container-fluid',

	template: 'end',

	initialize: function (score) {
		_.bindAll(this, 'renderCollection');
		this.totalScore = score;
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
			highscore: this.totalScore
		};
		this.collection.create( userData );
		this.userAdded = true;
		this.collection.fetch({reset: true});
	},
	render: function () {
		app.TemplateManager.get(this.template, function (text) {
			var template = _.template(text);
			this.$el.html( template({score: this.totalScore}) );
			this.renderCollection();
			if(this.userAdded) {
				this.$('.input-group').hide();
			}
		}.bind(this));
	},
	renderCollection: function () {
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