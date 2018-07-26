// ==============================================================================
// Set Dependencies
// ==============================================================================

var express = require('express');
var bodyParser = require('body-parser');

// ==============================================================================
// Express Setup
// create the express app
// set up the express app to handle the data parsing
// use express.static to serve static pages
// ==============================================================================

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// ==============================================================================
// Routing
// ==============================================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// ==============================================================================
// Server Listener
// ==============================================================================

app.listen(PORT, function() {
    console.log("Server listening on http://localhost: " + PORT);
});