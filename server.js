// Module dependencies

var application_root = __dirname,
express = require( 'express' ), //web framework
path = require( 'path' ), //Utilities for dealing with file paths
mongoose = require( 'mongoose' ); //MongoDB integration

var app = express(); //create server

//Configure server

app.configure( function() {
	//parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );

	//perform route loopup based on URL and HTTP method
	app.use( app.router );

	//where to server static content
	app.use( express.static( path.join (application_root, 'site')));

	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true}));
});
//start server
var port = 4711;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode',
		port, app.settings.env );
});

//Routes----------------------//
app.get( '/api', function (request, response) {
	response.send('Library API is running')
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
// End Routes--------------------/
mongoose.connect( 'mongodb://localhost/countries_db');
//Schemas
var Country = new mongoose.Schema({
	name: String,
	imgPath: String
});

//Models
var CountryModel = mongoose.model('Country', Country);