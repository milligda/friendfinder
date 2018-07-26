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

        // add the user submission to the user data file
        userData.push(req.body);

        // store the user's choices as a variable
        var userScores = req.body.scores;

        // clear the output variables before comparing the user's choices
        var activitySuggestion = '';
        var currentLowScore = 100;

        // for each activity compare the user's choices to the activities scores
        for (var i = 0; i < activitiesData.length; i++) {

            // set the matchScore to 0 at the start of the score comparison
            var matchScore = 0;

            // for each score within the activity compare the user's choice versus the activity's score for that question
            for (var j = 0; j < activitiesData[i].scores.length; j++) {

                // convert the user choice to an integer
                var userChoice = parseInt(userScores[j]);

                // store the activity's score for that question
                var activityScore = activitiesData[i].scores[j];

                // add the variance between the user's choice and the activity score to the matchScore
                matchScore += Math.abs(activityScore - userChoice);
            }

            // after comparing all the user's choices to the activity's scores, see if it is a better match than the current low score
            // if it is a better match, set the new currentLowScore and set the activitySuggestion name
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

        // return the activitySuggestion in a way that it can be added to a url and displayed
        return res.json(userData);
        
    });
}

