var highscoresEl = document.querySelector("#highscores");
var scoreboard = document.createElement("ul");
var clearScores = document.querySelector("clear");

function generateLi() {
    scoreboard.innerHTML = "";
    var userValues = JSON.parse(localStorage.getItem("score")) || [];

    userValues.forEach(function (user) {
        var item = document.createElement("li");
        item.innerText = `${user.score} ${user.initials}`;
        scoreboard.appendChild(item);
    });

    if (userValues.length === 0 ) {
        var noScoresMessage = document.createElement("li");
        noScoresMessage.innerText = "No high scores yet." ;
        scoreboard.appendChild(noScoresMessage);
    }
    highscoresEl.appendChild(scoreboard);
}

generateLi();

clearScores.addEventListener("click", function () {
    localStorage.removeItem("score");
    generateLi();
});