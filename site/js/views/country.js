var app = app || {};
app.CountryView = Backbone.View.extend({
	el: '.container',

	events: {
		'click #submitAnswer': 'checkAnswer',
		'click #skipQuestion': 'skipModel',
		'click #endGame': 'endGame',
		'keypress input[name="country-name"]': 'checkSubmit'
	},
	lifeState: {
		fullLife : 'full',
		twoLives : 'two-lives',
		oneLife : 'one-life',
		noLives : 'no-lives'
	},

	countryTmpl: _.template( $('#country-question-template').html() ),

	initialize: function () {
		_.bindAll(this, 'onCountriesSuccess', 'wrongAnswer', 'correctAnswer', 'setImage', 'toggleAnswerVisibility', 'showReinforcement');
		$.get('/api/countries', this.onCountriesSuccess);
	},
	onCountriesSuccess: function (data) {
		this.countryCollection = _.sample( data, data.length);
		this.currentModel = 0;
		this.lives = 3;
		this.totalCorrectAnswers = 0;
		this.showAnswer = false;
		this.currentState = this.lifeState.fullLife;
		this.render();


		this.$userInput = this.$('input[name="country-name"]');
		this.$lives = this.$('.lives');
		this.$image = this.$('#countryImage');
		this.$answer = this.$('#answer');
		this.$record = this.$('.record #number');
		this.$reinforcement = this.$('.positive-reinforcement');
		this.setImage(this.countryCollection[this.currentModel].imgPath);
	},
	setImage: function (path) {
		this.$image.attr('src', 'img/'+path);
	},
	checkAnswer: function () {
		var potentialAnswer = this.$userInput.val();
		if( this.countryCollection[this.currentModel].name === potentialAnswer.toLowerCase()) {
			this.correctAnswer();
		} else {
			this.wrongAnswer();
		}
	},
	correctAnswer: function () {
		this.totalCorrectAnswers += 1;
		this.$record.text(this.totalCorrectAnswers);
		this.showReinforcement();
	},
	wrongAnswer: function () {
		this.lives -=1;

		switch(this.lives) {
			case 2:
				this.changeState(this.lifeState.twoLives);
				this.shakeInput();
				break;
			case 1:
				this.changeState(this.lifeState.oneLife);
				this.shakeInput();
				break;
			default:
				this.changeState(this.lifeState.noLives);
				this.shakeInput();
				this.toggleAnswerVisibility();
				var that = this;
				setTimeout(function () {
					that.changeState(that.lifeState.fullLife);
					that.toggleAnswerVisibility();
					that.nextModel();
				},2000);
		}
	},
	skipModel: function () {
		var that = this;
		this.toggleAnswerVisibility();
		setTimeout(function () {
			that.nextModel();
			that.toggleAnswerVisibility();
		},2000);
	},
	endGame: function () {
		router.routeRequest('end/' + this.totalCorrectAnswers, true);
	},
	showReinforcement: function () {
		this.$reinforcement.show('slow');
		var that = this;
		setTimeout( function () {
			that.$reinforcement.hide('slow');
			that.nextModel();
		},2000);
	},
	toggleAnswerVisibility: function () {
		this.showAnswer = !this.showAnswer;
		if( this.showAnswer ) {
			this.$answer.text(this.countryCollection[this.currentModel].name);
			this.$answer.show('slow');
		} else {
			this.$answer.hide('slow');
		}
	},
	changeState: function (nextState) {
		this.currentState = nextState;
		this.$lives.attr('state',this.currentState);
	},
	nextModel: function () {
		this.changeState(this.lifeState.fullLife);
		this.lives = 3;
		this.currentModel += 1;
		if( this.$userInput.val() ) {
			this.$userInput.val('');
		}
		if( this.currentModel < this.countryCollection.length) {
			this.$image.hide("slow")
			var self = this;
			setTimeout(function() {
				self.setImage(self.countryCollection[self.currentModel].imgPath)
			}, 500);
			this.$image.show("slow");

		} else {
			this.endGame();
		}
	},
	render: function () {
		this.$el.html( this.countryTmpl( ) );
	},
	remove: function () {
		this.undelegateEvents();
		this.$el.empty();
		this.stopListening();
		return this;
	},
	shakeInput: function () {
		this.$userInput.effect( "shake" );
	},
	checkSubmit: function (event) {
		if(event.which === 13) {
			this.checkAnswer();
		}
	}
});