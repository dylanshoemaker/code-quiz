//what question are we on right now?
var questionsIndex = 0; //starts at 0
var time = questions.length * 15; //starts at 75
var timerContainer; //this will run the countdown, like a container in html 




//first lets add some variables and reference them to the html dom elements

var startButton = document.getElementById("start"); //start button variable
var questionsEl = document.getElementById("questions"); //references the different questions with the choices
var questionChoices = document.getElementById("choices"); //references the different choices, choices will act like submit button as well
var resultsEl = document.getElementById("results"); //Correct! or Wrong! to be displayed on following page with new question
var initialsEl = document.getElementById("initials"); //asks for initials one the last page
var finalResults = document.getElementById("finalresults"); //asks for initials one the last page
var submitButton = document.getElementById("submit"); //submit button variable
var timerEl = document.getElementById("time"); //for the countdown timer in the header


function startQuiz() { //what happens when you press the start quiz button
  var startScreenEl = document.getElementById("start-screen"); //select the first page html
  startScreenEl.setAttribute("class", "hide"); // references the css stylesheet, display: none .....so this hides the initial page

  questionsEl.removeAttribute("class"); // this will display the questions
 
  timerContainer = setInterval(updatedTime, 1000); //have timer countdown at start of quiz  https://www.w3schools.com/js/js_timing.asp

  timerEl.textContent = time;  //countdown timer is set at 75seconds to begin with

  getQuestion();  //transitional function to next function
}

function getQuestion() {
  var currentQuestion = questions[questionsIndex]; //reference the questions-array.js

  var titleEl = document.getElementById("questiontitle");
  titleEl.textContent = currentQuestion.title;


  questionChoices.innerHTML = ""; //delete old choices

  
  currentQuestion.choices.forEach(function(choice, i) {  // create a loop to actually add in the new choices https://stackoverflow.com/questions/56024232/use-the-foreach-function-to-add-option-elements-to-select-html-element    
    //because the old choices are deleted this will add brand new choices into the mix, it doesnt replace the values, rather it hides the values and unhides new values which are in the array https://utah.bootcampcontent.com/utah-coding-bootcamp/uofu-virt-bo-fsf-pt-06-2021-u-b/-/tree/master/04-Web-APIs/02-Challenge
    var loopChoices = document.createElement("button");
    loopChoices.setAttribute("class", "choice");
    loopChoices.setAttribute("value", choice);

    loopChoices.textContent = i + 1 + ". " + choice;   //https://www.youtube.com/watch?v=49pYIMygIcU  its like 40 minutes long and they didn't section it out but its full of good information

    
    loopChoices.onclick = onButtonClick; 

    questionChoices.appendChild(loopChoices); // puts the values on the page
    console.log(loopChoices);
  });
}

function onButtonClick() {

  if (this.value == questions[questionsIndex].answer) {

    resultsEl.textContent = "Correct!";

    
  } else {

    time -= 10; //issue 10 second penalty
    if (time < 0) { 
      time = 0;  //this is so that we don't have negative numbers
    }

    timerEl.textContent = time; //updates time on page

    resultsEl.textContent = "Wrong!"; // alerts them that they are wrong on the page though, not an alert pop-up
  }

  resultsEl.setAttribute("class", "results");
  setTimeout(function() {
    resultsEl.setAttribute("class", "hideresults");
  }, 3500); // displaying correct or wrong for 3.5 seconds

  questionsIndex++; // this moves the question along!!!!!!

  if (questionsIndex === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

function endQuiz() {  //borrow code from the start quiz section

  clearInterval(timerContainer);

  var finalResults = document.getElementById("finalresults");
  finalResults.removeAttribute("class"); // this will display the final results
  
  questionsEl.setAttribute("class", "hide");   //hide questions
  

  var scoreEl = document.getElementById("score");   //display final score
  scoreEl.textContent = time;
}

function updatedTime() {
  //this function is for what goes on in the timer, this updated time acts as a container
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

 
function showHighScores() {    //https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68
  //https://stackoverflow.com/questions/60037063/how-to-save-scores-in-javascript-quiz
  var initials = initialsEl.value.trim();
  if (initials.length > 1 && initials.length < 3) {   //makes it so that user has to enter 2 characters  //https://stackoverflow.com/questions/14718561/how-to-check-if-a-number-is-between-two-values
    
    //this is where we GET the highscores from localstorage
    var highScores = JSON.parse(window.localStorage.getItem("highScores")) || []; //https://stackoverflow.com/questions/60037063/how-to-save-scores-in-javascript-quiz
    //formats the scores into two different sections to store them appropriately 
    var quizResults = {
      score: time, 
      initials: initials
    };
    //this pushes the newly formatted scores to local storage for future reference 
    highScores.push(quizResults);
    window.localStorage.setItem("highScores", JSON.stringify(highScores));

    window.location.href = "highscore.html";   //this will take us to the separate html page
  }

  else {
    window.alert("Please enter 2 letters as the initials.");
  }
}


// print high score function will be located on highscores.js 
// click listeners 
submitButton.onclick = showHighScores;
startButton.onclick = startQuiz; //this starts the quiz

