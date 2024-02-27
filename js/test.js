function start() {
    var test = document.getElementById('test');
    var button = document.getElementById('button');
    var content = document.getElementById('content');

    content.style.opacity = '0';
    button.style.opacity = '0';

    setTimeout(function() {
        content.style.display = 'none';
        button.style.display = 'none';
    }, 1000);

    test.style.opacity = '0';
    setTimeout(function() {
        test.style.opacity = '1';

    }, 2000);
    test.style.display = 'block';
};
var lists = document.querySelectorAll('.question');

function checkLists() {
    console.log(lists.length)
    for (var i = 0; i < lists.length; i++) {
        var radioButtons = lists[i].querySelectorAll('input[type="radio"]');
        var isChecked = false;
        for (var j = 0; j < radioButtons.length; j++) {
            if (radioButtons[j].checked) {
                isChecked = true;
                break;
            }
        }
        if (!isChecked) {
            console.log('not checked')
            return false;
        }
    }
    console.log('checked')
    return true;
}

function updateButtonVisibility() {
    var finishButton = document.getElementById('finish');
    finishButton.style.display = checkLists() ? 'block' : 'none';
}

lists.forEach(function(list) {
    list.addEventListener('change', function() {
        updateButtonVisibility();
    });
});

var correctAnswersCount = 0;
var correctAnswers;
var index = document.getElementById('index');
fetch("../js/qa.json")
    .then(response => response.json())
    .then(data => {
        correctAnswers = data[index.innerText];
    })
    .catch(error => console.log(error))

function finish() {

    console.log(correctAnswers)
    var totalQuestions = lists.length;

    for (var i = 0; i < lists.length; i++) {
        var radioButtons = lists[i].querySelectorAll('input[type="radio"]');
        var selectedValue = null;

        for (var j = 0; j < radioButtons.length; j++) {
            if (radioButtons[j].checked) {
                selectedValue = radioButtons[j].value;
                break;
            }
        }

        var correctAnswer = getCorrectAnswer(i + 1);

        if (selectedValue === correctAnswer) {
            correctAnswersCount++;
        }
    }

    var test = document.getElementById('test');
    test.style.opacity = '0';
    setTimeout(function() {
        test.style.display = 'none';
    }, 1000);
    var resultElement = document.getElementById('results');

    resultElement.style.opacity = '0';
    setTimeout(function() {
        resultElement.style.opacity = '1';

    }, 2000);
    resultElement.style.display = 'block';

    var persents = document.getElementById('persents');
    var result = correctAnswersCount / totalQuestions * 100 + '%';
    persents.innerHTML = result;

    var correct = document.getElementById('correct');
    correct.innerHTML = correctAnswersCount;

}

function getCorrectAnswer(questionNumber) {
    switch (questionNumber) {
        case 1:
            return correctAnswers["1"];
        case 2:
            return correctAnswers["2"];
        case 3:
            return correctAnswers["3"];
        case 4:
            return correctAnswers["4"];
        case 5:
            return correctAnswers["5"];
        default:
            return null;
    }
}


function restart() {
    var results = document.getElementById('results');
    results.style.opacity = '0';

    setTimeout(function() {
        results.style.display = 'none';
    }, 1000);

    setTimeout(function() {
        window.location.reload();
    }, 2000);
}