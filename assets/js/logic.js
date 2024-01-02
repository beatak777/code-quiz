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

var currentQuestionIndex = 0;
var time = 60;
var timerId;

function displayQuestion() {

    if (currentQuestionIndex === 5) {
        questionScreen.classList.add("hide");
        endScreen.classList.remove("hide");
        return
    }

    const currentQuestion = questions[currentQuestionIndex];

    questionTitle.innerText = currentQuestion.title;
    choices.innerHTML = '';

    currentQuestion.choices.forEach(choice => {
        const choicesButton = document.createElement("button");
        choicesButton.innerText = choice;
        choicesButton.addEventListener("click", function () {
            const isCorrect = currentQuestion.answer === choice;

            feedback.innerText = isCorrect ? "Correct!" : "Wrong answer!";

            const audioPath = isCorrect ? "../api-code-quiz/code-quiz/assets/sfx/correct.wav" : "../api-code-quiz/code-quiz/assets/sfx/incorrect.wav";
            new Audio(audioPath).play();

            if (!isCorrect) timer.textContent = time -= 10;
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
    const scoreboard = JSON.parse(localStorage.getItem("score")) || [];
    scoreboard.push({score: time, initials: initials.value });
    localStorage.setItem("score", JSON.stringify(scoreboard));
    window.location.href = "highscores.html"
    
})
