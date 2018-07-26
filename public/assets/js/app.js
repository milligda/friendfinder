
// ==============================================================================
// function for displaying survey questions
// ==============================================================================

function populateQuestions() {

    // cycle through each question
    for (var i = 0; i < questions.length; i++) {

        // create the div container for the question, the id, the label element, the select element and the default select option
        var question = $('<div class="form-group">');
        var id = 'question' + (i + 1);
        var label = $('<label for="' + id + '" class="question-header">' + questions[i].title + '</label>');
        var select = $('<select class="form-control select-box " id="' + id + '">');
        var defaultOption = $('<option selected>Select an option</option>');

        // append the pieces to the question div
        defaultOption.appendTo(select);
        label.appendTo(question);

        // cycle through each option and append them to the select element
        for (var j = 0; j < questions[i].option.length; j++) {
            var option = $('<option value="' + (j + 1) + '">' + questions[i].option[j] + '</option>');
            option.appendTo(select);
        }

        // append the select element to the question div and append the question div to the form
        select.appendTo(question);
        question.appendTo('#survey-form');
    }

    // after all the questions have been added, create the submit button and append it to the form
    var submitButton = $('<button type="submit" id="submit-btn" class="btn btn-primary">Submit</button>');
    submitButton.appendTo('#survey-form');
}

// ==============================================================================
// Survey Event Listener
// ==============================================================================

$(document).on('click', '#submit-btn', function (event) {
    event.preventDefault();

    // create an array to store the user scores
    var userScores = [];
    var userName = $('#name-input').val().trim();

    var surveyComplete = true;

    // check if the user name was entered
    if (userName == "") {

        alert("Please enter your name before submitting.");

    } else {

        // cycle through each question
        for (var i = 1; i < questions.length + 1; i++) {

            // store the answer
            var score = $('#question' + i).val().trim();

            // check to make sure that the answer is not NaN
            if (isNaN(score)) {

                // if it is, change surveyComplete to false
                surveyComplete = false;

                // alert the user to fill in all questions and break the for loop
                alert("Please answer all the questions before submitting.");
                break;
            }

            // push the answer to the array as an integer
            userScores.push(parseInt(score));
        }

        // if the survey is complete, create the newUser object and post it
        if (surveyComplete) {

            // create the newUser object with the user's name and scores
            var newUser = {
                name: userName,
                scores: userScores
            }

            // post the newUser object.  the data received will be the activity which we will then redirect the user to
            $.post('/api/activities', newUser, function () {

                // redirect to the correct activity page
                console.log("this was logged");
            });
        }
    }
});

// ==============================================================================
// When the survey page is ready, display the questions
// ==============================================================================

$(document).ready(function() {

    populateQuestions();
});