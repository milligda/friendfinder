$(document).ready(function() {

    function populateQuestions() {

        for (var i = 0; i < questions.length; i++) {
            var question = $('<div class="form-group">');
            var id = 'question' + (i + 1);
            var label = $('<label for="' + id + '" class="question-header">' + questions[i].title + '</label>');
            var select = $('<select class="form-control select-box" id="' + id + '">');
            var defaultOption = $('<option selected>Select an option</option>');
            defaultOption.appendTo(select);
            label.appendTo(question);

            for (var j = 0; j < questions[i].option.length; j++) {
                var option = $('<option value="' + (j + 1) + '">' + questions[i].option[j] + '</option>');
                option.appendTo(select);
            }
            select.appendTo(question);
            question.appendTo('#survey-form');
        }

        var submitButton = $('<button type="submit" id="submit-btn" class="btn btn-primary">Submit</button>');
        submitButton.appendTo('#survey-form');
    }

    populateQuestions();
});

$(document).on('click', '#submit-btn', function (event) {
    event.preventDefault();

    // create an array to store the user scores
    var userScores = [];

    // for each question, store the answer and push it to the userScores array
    for (var i = 1; i < questions.length + 1; i++) {

        // store the answer
        var score = $('#question' + i).val().trim();

        // push the answer to the array as an integer
        userScores.push(parseInt(score));
    }

    // create the newUser object with the user's name and scores
    var newUser = {
        name: $('#name-input').val().trim(),
        scores: userScores
    }

    // console.log(newUser);

    // post the newUser object.  the data received will be the activity which we will then redirect the user to
    $.post('/api/activities', newUser, function (data) {

        // redirect to the correct activity page
        console.log(data);

    });

});