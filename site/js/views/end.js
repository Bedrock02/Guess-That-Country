var app = app || {};
app.EndGameView = Backbone.View.extend({
	events: {
		'click #restartGame' : 'restartApp',
		'click #submitScore' : 'addNewUser'
	},
	el: '.container',

	endGameTmpl: _.template( $('#end-game-template').html() ),

	initialize: function (score) {
		_.bindAll(this, 'renderCollection');
		this.totalScore = score;
		this.collection = new app.Users();
		this.collection.fetch({reset: true});

		//this.listenTo(this.collection,'add', this.addtoScoreBoard);
		this.listenTo( this.collection, 'reset', this.render );
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
		this.$el.html( this.endGameTmpl({score: this.totalScore}) );
		this.renderCollection();
		if(this.userAdded) {
			this.$('.input-group').hide();
		}
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