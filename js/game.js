var spotOne = document.getElementById('spotOne');
var spotTwo = document.getElementById('spotTwo');
var spotThree = document.getElementById('spotThree');
var feedback = document.getElementById('feedback');
var funcArray = [animateFirstToThird, animateSecondToOne, animateSecondToThird];
var options = [];
var guessing = false;
var speed;
var classTime;
var shuffles;
var score;

function getOptions() {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split("=");
    options[i] = pair[1]
  }
}

function parseOptions(options) {
  if (options[0] === "Slow") {
    speed = 1500;
  } else if (options[0] === "Medium") {
    speed = 1000;
  } else {
    speed = 500;
  };
  classTime = speed - 20;
  shuffles = parseInt(options[1]);
  console.log('sp=' + speed + '; classtime=' + classTime + '; sh=' + shuffles);
  return speed, shuffles;
}


function animateFirstToThird(childOfSpotOne, childOfSpotThree) {
  childOfSpotOne.setAttribute('class', 'oneToThree');
  childOfSpotThree.setAttribute('class', 'threeToOne');
  setTimeout(function(){
    childOfSpotOne.setAttribute('class', null);
    childOfSpotThree.setAttribute('class', null);
    spotOne.children[0].appendChild(childOfSpotThree);
    spotThree.children[0].appendChild(childOfSpotOne);
  }, classTime)
}

function animateSecondToOne(childOfSpotOne, childOfSpotTwo) {
  childOfSpotTwo.setAttribute('class', 'twoToOne');
  childOfSpotOne.setAttribute('class', 'oneToTwo');
  setTimeout(function(){
    childOfSpotTwo.setAttribute('class', null);
    childOfSpotOne.setAttribute('class', null);
    spotOne.children[0].appendChild(childOfSpotTwo);
    spotTwo.children[0].appendChild(childOfSpotOne);
  }, classTime)
}

function animateSecondToThird(childOfSpotTwo, childOfSpotThree) {
  childOfSpotTwo.setAttribute('class', 'twoToThree');
  childOfSpotThree.setAttribute('class', 'threeToTwo');
  setTimeout(function(){
    childOfSpotTwo.setAttribute('class', null);
    childOfSpotThree.setAttribute('class', null);
    spotTwo.children[0].appendChild(childOfSpotThree);
    spotThree.children[0].appendChild(childOfSpotTwo);
  }, classTime)
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

function shuffle (s, i) {
   setTimeout(function () {
      console.log(i);
      pickRandomShuffle();
      if (--i) {
        shuffle(speed, i);
      } else {
        guessing = true;
      }
   }, s)
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
  getOptions();
  parseOptions(options);
  assignRightAnswer();
  setTimeout(shuffle(speed, shuffles), 2000); //Argument is however many times you want to shuffle
}

function spotOneClick () {
  if(guessing) {
    if(spotOne.children[0].children[0].id === 'winner'){
      feedback.style.display = 'block';
      feedback.innerHTML = '<p>You win! Your score is ' + score + '. <br />Click to see high scores.';
      } else {
        feedback.style.display = 'block';
        feedback.innerHTML = '<p>You lose! Your score is ' + score + '. <br />Click to see high scores.';
    } //produce feedback
  }
  guessing = false;
}

function spotTwoClick () {
  if(guessing) {
    if(spotTwo.children[0].children[0].id === 'winner'){
      feedback.style.display = 'block';
      feedback.innerHTML = '<p>You win! Your score is ' + score + '. <br />Click to see high scores.';
    } else {
      feedback.style.display = 'block';
      feedback.innerHTML = '<p>You lose! Your score is ' + score + '. <br />Click to see high scores.';
    } //produce feedback
  }
  guessing = false;
}

function spotThreeClick () {
  if(guessing) {
    if(spotThree.children[0].children[0].id === 'winner'){
      feedback.style.display = 'block';
      feedback.innerHTML = '<p>You win! Your score is ' + score + '. <br />Click to see high scores.';
    } else {
      feedback.style.display = 'block';
      feedback.innerHTML = '<p>You lose! Your score is ' + score + '. <br />Click to see high scores.';
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
