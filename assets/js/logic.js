const startButton = document.querySelector('#start');
const startScreen = document.querySelector('#start-screen');
const questionScreen = document.querySelector('#questions');
const questionTitle = document.querySelector('#question-title');
const choices = document.querySelector('#choices');
const feedback = document.querySelector('#feedback');
const timer = document.querySelector('#time');
const finalScore = document.querySelector('#final-score');
const endScreen = document.querySelector('#end-screen');
const submit = document.querySelector('#submit');
const initials = document.querySelector('#initials');

var intervalHandle;
var currentQuestionIndex = 0;
var time = 60;
var timerId;

function displayQuestion() {

    if (currentQuestionIndex === 5) {
        questionScreen.classList.add("hide");
        endScreen.classList.remove("hide");
        return
    }

    var currentQuestion = questions[currentQuestionIndex];

    questionTitle.innerText = currentQuestion.title;
    choices.innerHTML = '';

    currentQuestion.choices.forEach(function (choice) {
        const choicesButton = document.createElement("button");
        choicesButton.innerText = choice;
        choicesButton.addEventListener("click", function () {
            if (currentQuestion.answer === choice) {
                feedback.innerText = "Correct!";
                
                function playCorrectAudio() {
                    var correct = new Audio("../api-code-quiz/code-quiz/assets/sfx/correct.wav");
                    correct.play();
                }
                playCorrectAudio();

            } else {
                feedback.innerText = "Wrong answer!";
                function playIncorrectAudio() {
                    var incorrect = new Audio("../api-code-quiz/code-quiz/assets/sfx/incorrect.wav");
                    incorrect.play();
                    timer.textContent = time -= 10;
                }
                playIncorrectAudio();
            } 
            currentQuestionIndex++;

            displayQuestion();
        })
        choices.append(choicesButton);

    })
}
function clockTimer() {
    time--;

    timer.textContent = time

    if (time <= 0 || currentQuestionIndex === 5) {
        clearInterval(timerId);
        quizFinish();
    }
};

function quizFinish() {
    questionScreen.classList.add("hide");
    endScreen.classList.remove("hide");
    feedback.classList.add("hide");
    finalScore.innerText = time; 
}

startButton.addEventListener("click", function () {
    startScreen.classList.add("hide");
    endScreen.classList.add("hide");
    questionScreen.classList.remove("hide");
    feedback.classList.remove("hide");
    displayQuestion();
    timerId = setInterval(clockTimer, 1000);
    clockTimer();
});




submit.addEventListener("click", function () {
    var scoreboard = JSON.parse(localStorage.getItem("score"));
    if (Array.isArray(scoreboard)) {

    }else {
        scoreboard = [];
    }
    var highscores = {
        score: time,
        initials: initials.value

    };

    scoreboard.push(highscores);

    localStorage.setItem("score", JSON.stringify(scoreboard));
    window.location.href = "highscores.html"
    
})
// Click the start button:
// Landing page goes away
// Timer starts
// The first question appears (with its answers)

// For each question:
// User clicks an answer
// Their choice is compared to the correct answer as stored in the question's object
// If correct, tell them
// If incorrect, tell them AND subtract time from the timer
// Optional: play a sound for correct or incorrect
// Either way, the question disappears after a few seconds and the next question appears

// After the last question:
// Timer stops
// Question disappears
// Form appears for user to enter their initials
// Display their score

// User submits form
// Initials and score get stored in local storage
// User is taken to the high scores page
// High scores are listed, sorted highest to lowest
// User has option to take the quiz again


// these are done 

// Set of questions --> array of objects 
// Each question needs the following:
// Question text
// Set of answers
// Which answer is correct

// Landing page:
// Explanation of the quiz
// Start button