// ==============================================================================
// Set Dependencies
// ==============================================================================

var path = require('path');

// ===============================================================================
// Routing
// routing is exported to server.js when it is called and passes in the app parameter
// routes for getting the html files
// ===============================================================================

module.exports = function(app) {

    // route the root URL to the home.html file
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/home.html"));
    });

    // route to the survey.html file
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/survey.html"));
    });

    // route any unmatched urls to the home.html file
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/home.html"));
    });
}