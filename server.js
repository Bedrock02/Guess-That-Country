var application_root = __dirname,
express = require( 'express' ),
path = require( 'path' ),
mongoose = require( 'mongoose' );

var app = express();


app.configure( function() {
	app.use( express.bodyParser() );
	app.use( express.methodOverride() );
	app.use( app.router );
	app.use( express.static( path.join (application_root, 'site')));
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true}));
});

var port = 4711;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode',
		port, app.settings.env );
});

//Routes----------------------//
app.get( '/api', function (request, response) {
	response.send('Library API is running');
});

//get list of all countries
app.get( '/api/countries', function(request, response) {
	return CountryModel.find( function( err, countries ) {
		if(!err) {
			return response.send( countries );
		} else {
				return console.log( err );
		}
	});
});

app.post( '/api/countries/region', function(request, response) {
	return CountryModel.find({'region': request.body.region}, function( err, countries ) {
		if(!err) {
			return response.send( countries );
		} else {
			return console.log( err );
		}
	});
});

//get list of all users that submitted a highscore
app.get( '/api/users', function(request, response) {
	return UserModel.find({}, null, {sort: {highscore: -1}}, function( err, users ) {
		if(!err) {
			return response.send( users );
		} else {
			return console.log( err );
		}
	});
});

//Insert a user with a highscore
app.post( '/api/users', function(request, response) {
	var user = new UserModel({
		username: request.body.username,
		highscore: request.body.highscore,
		region: request.body.region
	});
	user.save( function(err) {
		if(!err) {
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
	});
	return response.send( user );
});
// End Routes--------------------/
mongoose.connect( 'mongodb://localhost/countries_db');

//Schemas
var Country = new mongoose.Schema({
	name: String,
	imgPath: String
});

var User = new mongoose.Schema({
	username: String,
	highscore: Number,
	region: String
});

//Models
var CountryModel = mongoose.model('Country', Country);
var UserModel = mongoose.model('User', User);
