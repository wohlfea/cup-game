var spotOne = document.getElementById('spotOne');
var spotTwo = document.getElementById('spotTwo');
var spotThree = document.getElementById('spotThree');
var feedback = document.getElementById('feedback');
var popup = document.getElementById('popup');
var funcArray = [animateFirstToThird, animateSecondToOne, animateSecondToThird];
var options = [];
var guessing = false;
var score;

function getOptions() {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split("=");
    options[i] = pair[1]
  }
} getOptions();

function parseOptions(options) {
  //translate options[0] to milliseconds
  //set # of shuffles to options[1]
}


function animateFirstToThird(childOfSpotOne, childOfSpotThree) {
  childOfSpotOne.setAttribute('class', 'oneToThree');
  childOfSpotThree.setAttribute('class', 'threeToOne');
  setTimeout(function(){
    childOfSpotOne.setAttribute('class', null);
    childOfSpotThree.setAttribute('class', null);
    spotOne.children[0].appendChild(childOfSpotThree);
    spotThree.children[0].appendChild(childOfSpotOne);
  }, 980)
}

function animateSecondToOne(childOfSpotOne, childOfSpotTwo) {
  childOfSpotTwo.setAttribute('class', 'twoToOne');
  childOfSpotOne.setAttribute('class', 'oneToTwo');
  setTimeout(function(){
    childOfSpotTwo.setAttribute('class', null);
    childOfSpotOne.setAttribute('class', null);
    spotOne.children[0].appendChild(childOfSpotTwo);
    spotTwo.children[0].appendChild(childOfSpotOne);
  }, 980)
}

function animateSecondToThird(childOfSpotTwo, childOfSpotThree) {
  childOfSpotTwo.setAttribute('class', 'twoToThree');
  childOfSpotThree.setAttribute('class', 'threeToTwo');
  setTimeout(function(){
    childOfSpotTwo.setAttribute('class', null);
    childOfSpotThree.setAttribute('class', null);
    spotTwo.children[0].appendChild(childOfSpotThree);
    spotThree.children[0].appendChild(childOfSpotTwo);
  }, 980)
}

function pickRandomShuffle() {
  var randomNumber = Math.floor(Math.random()*funcArray.length);
  if (randomNumber === 0) {
    funcArray[0](spotOne.children[0].children[0], spotThree.children[0].children[0]);
  } else if (randomNumber === 1) {
    funcArray[1](spotOne.children[0].children[0], spotTwo.children[0].children[0]);
  } else if (randomNumber === 2) {
    funcArray[2](spotTwo.children[0].children[0], spotThree.children[0].children[0]);
  }
}

function shuffle (i) {
   setTimeout(function () {
      console.log(i);
      pickRandomShuffle();
      if (--i) {
        shuffle(i);
      } else {
        guessing = true;
      }
   }, 1000)
};

function assignRightAnswer() {
  var randomNumber = Math.floor(Math.random()*3);
  if (randomNumber === 0 ){
    spotOne.children[0].setAttribute('class', 'highlight');
    spotOne.children[0].children[0].setAttribute('id', 'winner');
  }else if(randomNumber === 1){
    spotTwo.children[0].setAttribute('class', 'highlight');
    spotTwo.children[0].children[0].setAttribute('id', 'winner');
  }else if(randomNumber === 2){
    spotThree.children[0].setAttribute('class', 'highlight');
    spotThree.children[0].children[0].setAttribute('id', 'winner');
  }
}

// console.log()
function runGame() {
  assignRightAnswer();
  setTimeout(shuffle(3), 2000); //Argument is however many times you want to shuffle
}

function spotOneClick () {
  if(guessing) {
    if(spotOne.children[0].children[0].id === 'winner'){
      popup.setAttribute('class', 'popup');
      feedback.style.display = 'block';
      feedback.style.color = 'green';
      feedback.innerHTML = '<a href="scores.html">You win! Your score is ' + score + '. <br />Click to see high scores.</a>';
      } else {
        popup.setAttribute('class', 'popup');
        feedback.style.display = 'block';
        feedback.style.color = 'red';
        feedback.innerHTML = '<a href="scores.html">You lose! Your score is ' + score + '. <br />Click to see high scores.</a>';
    } //produce feedback
  }
  guessing = false;
}

function spotTwoClick () {
  if(guessing) {
    if(spotTwo.children[0].children[0].id === 'winner'){
      popup.setAttribute('class', 'popup');
      feedback.style.display = 'block';
      feedback.style.color = 'green';
      feedback.innerHTML = '<a href="scores.html">You win! Your score is ' + score + '. <br />Click to see high scores.</a>';
    } else {
      popup.setAttribute('class', 'popup');
      feedback.style.display = 'block';
      feedback.style.color = 'red';
      feedback.innerHTML = '<a href="scores.html">You lose! Your score is ' + score + '. <br />Click to see high scores.</a>';
    } //produce feedback
  }
  guessing = false;
}

function spotThreeClick () {
  if(guessing) {
    if(spotThree.children[0].children[0].id === 'winner'){
      popup.setAttribute('class', 'popup');
      feedback.style.display = 'block';
      feedback.style.color = 'green';
      feedback.innerHTML = '<a href="scores.html">You win! Your score is ' + score + '. <br />Click to see high scores.</a>';
      popup.setAttribute('class', 'popup');
      feedback.style.display = 'block';
      feedback.style.color = 'red';
      feedback.innerHTML = '<a href="scores.html">You lose! Your score is ' + score + '. <br />Click to see high scores.</a>';
    } //produce feedback
  }
  guessing = false;
}

runGame();
// shuffle(5);

spotOne.addEventListener('click', spotOneClick);
spotTwo.addEventListener('click', spotTwoClick);
spotThree.addEventListener('click', spotThreeClick);
//feedback.addEventListener('click', giveFeedback);
