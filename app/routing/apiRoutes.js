// ===============================================================================
// Required Data Files
// ===============================================================================

var activitiesData = require('../data/activities.js');
var userData = require('../data/users.js');


// ===============================================================================
// Routing
// routing is exported to server.js when it is called and passes in the app parameter
// routes for getting and posting the API data
// ===============================================================================

module.exports = function(app) {
    
    // route to the activities json file
    app.get('/api/activities', function (req, res) {
        return res.json(activitiesData);
    });

    // route to the users json file
    app.get('/api/users', function (req, res) {
        return res.json(userData);
    });

    // receive the user submission
    app.post('/api/activities', function (req, res) {

        var userScores = req.body.scores;

        var activitySuggestion = '';
        var currentLowScore = 100;

        // for each activity
        for (var i = 0; i < activitiesData.length; i++) {

            var matchScore = 0;

            // for each score within the activity
            for (var j = 0; j < activitiesData[i].scores.length; j++) {

                // convert the user choice to an integer
                var userChoice = parseInt(userScores[j]);
                var activityScore = activitiesData[i].scores[j];

                // add the variance between the user's choice and the activity score to the matchScore
                matchScore += Math.abs(activityScore - userChoice);
            }

            if (matchScore < currentLowScore) {
                currentLowScore = matchScore;
                activitySuggestion = activitiesData[i].name;

                console.log(activitySuggestion + " - " + currentLowScore);
            }
        }

        console.log(currentLowScore);
        console.log(activitySuggestion);


        // store the user response in the 
        // userData.push(req.body);

        return res.json(userData);
        
    });
}

