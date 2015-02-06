var app = app || {};
app.CountryView = Backbone.View.extend({

	el: '.container-fluid',

	events: {
		'click #submitAnswer': 'checkAnswer',
		'click #skipQuestion': 'skipModel',
		'click .choice': 'checkEasyAnswer',
		'click #endGame': 'endGame',
		'keypress input[name="country-name"]': 'checkSubmit',
		'click .choice a': 'buttonClicked'
	},

	template: 'country',

	lock: false,

	lifeState: {
		fullLife : 'full',
		twoLives : 'two-lives',
		oneLife : 'one-life',
		noLives : 'no-lives'
	},

	initialize: function (data) {
		_.bindAll(this, 'onCountriesSuccess',
			'wrongAnswer',
			'correctAnswer',
			'setImage',
			'toggleAnswerVisibility',
			'showReinforcement',
			'modifyScore',
			'setPoints',
			'setRecord',
			'buttonClicked',
			'showModeView');

		this.region = data.region;
		this.mode = data.mode;

		if( this.region.toLowerCase() == "all" ) {
			$.get('/api/countries', this.onCountriesSuccess);
		} else {
			$.ajax({
  			type: 'POST',
  			url: '/api/countries/region',
  			data: {region: this.region},
  			success: this.onCountriesSuccess,
  			dataType: 'JSON'
			});
		}
	},
	onCountriesSuccess: function (data) {
		this.countryCollection = _.shuffle( data );
		this.currentModel = 0;
		this.showAnswer = false;
		this.setRecord();
		this.setPoints();
		this.render();
	},
	setImage: function (path) {
		this.$image.attr('src', 'img/'+path);
	},
	setPoints: function () {
		if( this.mode === 'easy' ) {
			this.positivePoints = 1;
			this.negativePoints = 0;
		}else {
			this.positivePoints = 3;
			this.negativePoints = -1;
		}
	},
	setRecord: function () {
		this.lives = 3;
		this.totalCorrectAnswers = 0;
		this.currentState = this.lifeState.fullLife;
	},
	checkAnswer: function (e) {
		if (this.lock) { return; }
		this.lock = true;
		var potentialAnswer = this.$userInput.val().trim();
		if( this.countryCollection[this.currentModel].name === potentialAnswer.toLowerCase()) {
			this.correctAnswer();
		} else {
			this.wrongAnswer();
		}
	},
	checkEasyAnswer: function(e) {
		if (this.lock) { return }
		this.lock = true;
		var potentialAnswer = this.$(e.target).text();
		if( this.countryCollection[this.currentModel].name === potentialAnswer.toLowerCase()) {
			this.correctAnswer();
		} else {
			this.wrongAnswer(e);
		}
	},
	correctAnswer: function () {
		this.modifyScore(this.positivePoints);
		this.showReinforcement();
	},
	wrongAnswer: function (e) {
		this.lives -=1;
		this.modifyScore(this.negativePoints);
		switch(this.lives) {
			case 2:
				this.changeState(this.lifeState.twoLives);
				this.shakeInput(e);
				break;
			case 1:
				this.changeState(this.lifeState.oneLife);
				this.shakeInput(e);
				break;
			default:
				this.changeState(this.lifeState.noLives);
				this.shakeInput(e);
				this.toggleAnswerVisibility();
				_.delay(function () {
					this.changeState(this.lifeState.fullLife);
					this.toggleAnswerVisibility();
					this.nextModel();
				}.bind(this),2000);
		}
		this.lock = false;
	},
	modifyScore: function (points) {
		this.totalCorrectAnswers += points;
		this.$record.text(this.totalCorrectAnswers);
	},
	skipModel: function () {
		if(this.lock) { return; }
		this.lock = true;
		this.toggleAnswerVisibility();
		_.delay(function () {
			this.toggleAnswerVisibility();
			this.nextModel();
		}.bind(this),2000);
	},
	endGame: function () {
		router.routeRequest('end/' + this.totalCorrectAnswers + '/' + this.region, true);
	},
	showReinforcement: function () {
		this.$reinforcement.show('slow');
		_.delay(function () {
			this.$reinforcement.hide('slow');
			this.nextModel();
		}.bind(this),2000);
	},
	toggleAnswerVisibility: function () {
		this.showAnswer = !this.showAnswer;
		if( this.showAnswer ) {
			this.$answer.fadeTo(500, 1);
		} else {
			this.$answer.fadeTo(500, 0);
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
			this.$image.fadeTo(500,0);
			_.delay(function() {
				this.setImage(this.countryCollection[this.currentModel].imgPath);
				this.$answer.text(this.countryCollection[this.currentModel].name);
			}.bind(this), 500);
			this.$image.fadeTo(500,1);
			this.addChoices();
		} else {
			this.endGame();
		}
		this.lock = false;
	},
	render: function () {
		app.TemplateManager.get(this.template, function(text) {
			this.$el.html( text );
			this.$userInput = this.$('input[name="country-name"]');
			this.$lives = this.$('.lives');
			this.$image = this.$('#countryImage');
			this.$answer = this.$('#answer');
			this.$record = this.$('.record #number');
			this.$reinforcement = this.$('.positive-reinforcement');
			this.$answer.text(this.countryCollection[this.currentModel].name);
			this.setImage(this.countryCollection[this.currentModel].imgPath);
			this.showModeView();
		}.bind(this));
	},
	showModeView: function() {
		this.$('#'+this.mode).show();
		if(this.mode == 'easy') {
			this.addChoices();
		}
	},
	addChoices: function() {
		var possibleAnswers,
			answer = this.countryCollection[this.currentModel];
		do {
			possibleAnswers = _.sample(this.countryCollection, 3);
		}
		while(_.contains( choices, answer));
		possibleAnswers.push(answer);
		possibleAnswers = _.shuffle(possibleAnswers);
		var choices = this.$('.choice a span');
		_.times(4, function(index) {
			$(choices[index]).text(possibleAnswers[index].name);
		});
	},
	remove: function () {
		this.undelegateEvents();
		this.$el.empty();
		this.stopListening();
		return this;
	},
	shakeInput: function (e) {
		if(this.mode == 'easy') {
			this.$(e.target.parentElement).effect( "shake" );
		}else {
			this.$userInput.effect( "shake" );
		}
	},
	checkSubmit: function (event) {
		if(event.which === 13) {
			this.checkAnswer();
		}
	},
	buttonClicked: function (event) {
		if( this.currentSelectedAnswer ) {
			this.$(this.currentSelectedAnswer).toggleClass('clicked');
		}
		this.currentSelectedAnswer = event.target.parentElement;
		this.$(event.target.parentElement).toggleClass('clicked');
	}
});
