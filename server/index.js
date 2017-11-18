var express = require('express');
var ip = require('ip');
var bodyParser = require('body-parser');
var Cloudant = require('cloudant');

var app = express();
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3001
app.listen(port, function() {
    console.log("Server starting on port " + port);
})

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ROUTES //
// ------------------------------------------------------------------------- //

app.post('/review', function(req, res){
  db.insert( { text : JSON.stringify(req.body.text), creation_date : new Date().getTime() } );
  res.send();
});

app.get('/reviews', function(req, res){
  db.list({include_docs:true}, function (err, data) {
    res.send({payload: data.rows});
  });
});

app.get('/review', function(req, res){
  db.get(req.query.id, function (err, data) {
    res.send({payload: data });
  });
});

app.get('/info', function(req, res){
  res.send({ payload: {ip: ip.address(), cluster: (process.env.CLUSTER || "undefined") } });
});

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// CLOUDANT DB //
// ------------------------------------------------------------------------- //

// To Store URL of Cloudant as found under environment variables on from App Overview page
var cloudant_url;
var fileName = "./config.json";
if (process.env.CLOUDANT_URL) { //Check if cloudant_url is in the url
  cloudant_url = process.env.CLOUDANT_URL;
  console.log("Cloudant URL read from environment variable");
} else {
  try {
    var configfile = require(fileName);
    cloudant_url = configfile.CLOUDANT_URL;
    console.log("Cloudant URL read from config file");
  } catch (err) {
    console.log("Config file '" + fileName + "' not found", err);
  }
}

// Connect using cloudant npm and URL obtained from previous step
var cloudant = Cloudant({url: cloudant_url});
// Edit this variable value to change name of database.
var dbname = 'review';
var db;

// Create database
cloudant.db.create(dbname, function(err, data) {
  	if (err) //If database already exists
	    console.log("Database already exists."); //NOTE: A Database can be created through the GUI interface as well
  	else
	    console.log("Created database.");

  	// Use the database for further operations like create view, update doc., read doc., delete doc. etc, by assigning dbname to db.
  	db = cloudant.db.use(dbname);
});
