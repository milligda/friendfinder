// ==============================================================================
// Set Dependencies & Required files
// ==============================================================================

var path = require('path');
var activities = require('../data/activities.js');

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

    // route to the individual activity pages
    app.get("/activity/:activity", function (req, res) {

        var activity = req.params.activity;
        
        // cycle through the activities
        for (var i = 0; i < activities.length; i++) {

            // if the param matches one of our activities, render the 
            if (activity === activities[i].slug) {
                return res.render("activity", activities[i]);
            }
        }
    })

    // route any unmatched urls to the home.html file
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/home.html"));
    });
}