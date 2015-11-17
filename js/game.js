var spotOne = document.getElementById('spotOne');
var spotTwo = document.getElementById('spotTwo');
var spotThree = document.getElementById('spotThree');
var feedback = document.getElementById('feedback');
var popup = document.getElementById('popup');
var funcArray = [animateFirstToThird, animateSecondToOne, animateSecondToThird];
var options = [];
var guessing = false;
var speed;
//var spFactor;
var classTime;
var shuffles;
//var shFactor;
var score;
var highScores = [];

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
    //spFactor = 1.5;
  } else if (options[0] === "Medium") {
    speed = 1000;
    //spFactor = 1;
  } else {
    speed = 500;
    //spFactor = 0.5;
  };
  classTime = speed - 20;
  shuffles = parseInt(options[1]);
  //shFactor = shuffles;
  //score = spFactor * shFactor;
  console.log('sp=' + speed + '; classTime=' + classTime + '; sh=' + shuffles);
  return speed, shuffles;
}


function animateFirstToThird(childOfSpotOne, childOfSpotThree) {
  childOfSpotThree.style.animation = 'threeToOnes ' + speed + 'ms';
  childOfSpotOne.style.animation = 'oneToThrees ' + speed + 'ms';
  setTimeout(function(){
    childOfSpotOne.style.animation = null;
    childOfSpotThree.style.animation = null;
    spotOne.children[0].appendChild(childOfSpotThree);
    spotThree.children[0].appendChild(childOfSpotOne);
  }, classTime)
}

function animateSecondToOne(childOfSpotOne, childOfSpotTwo) {
  childOfSpotTwo.style.animation = 'twoToOnes ' + speed + 'ms';
  childOfSpotOne.style.animation = 'oneToTwos ' + speed + 'ms';
  setTimeout(function(){
    childOfSpotTwo.style.animation = null;
    childOfSpotOne.style.animation = null;
    spotOne.children[0].appendChild(childOfSpotTwo);
    spotTwo.children[0].appendChild(childOfSpotOne);
  }, classTime)
}

function animateSecondToThird(childOfSpotTwo, childOfSpotThree) {
  childOfSpotTwo.style.animation = 'twoToThrees ' + speed + 'ms';
  childOfSpotThree.style.animation = 'threeToTwos ' + speed + 'ms';
  setTimeout(function(){
    childOfSpotTwo.style.animation = null;
    childOfSpotThree.style.animation = null;
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
    spotOne.children[0].children[0].setAttribute('id', 'winner');
    spotOne.children[0].children[0].children[0].src = 'images/slash/owlslash250.png';
    setTimeout(function(){
    spotOne.children[0].children[0].children[0].src = 'images/slash/slash250.png'
    },1000);
  }else if(randomNumber === 1){
    spotTwo.children[0].children[0].setAttribute('id', 'winner');
    spotTwo.children[0].children[0].children[0].src = 'images/slash/owlslash250.png'
    setTimeout(function(){
    spotTwo.children[0].children[0].children[0].src = 'images/slash/slash250.png'
    },1000);
  }else if(randomNumber === 2){
    spotThree.children[0].children[0].setAttribute('id', 'winner');
    spotThree.children[0].children[0].children[0].src = 'images/slash/owlslash250.png'
    setTimeout(function(){
    spotThree.children[0].children[0].children[0].src = 'images/slash/slash250.png'
    },1000);
  }
}
function reveal() {
  winnerReveal = document.getElementById('winner');
  winnerReveal.children[0].src = 'images/slash/owlslash250.png';
}

function runGame() {
  getOptions();
  parseOptions(options);
  assignRightAnswer();
  setTimeout(function() {
    shuffle(speed, shuffles)}, 1000); //Argument is however many times you want to shuffle
}

function spotOneClick () {
  if(guessing) {
    reveal();
    if(spotOne.children[0].children[0].id === 'winner'){
      score = speed * shuffles;
      isHighScore(score);
      popup.setAttribute('class', 'popup');
      feedback.style.display = 'flex';
      feedback.style.color = 'green';
      feedback.innerHTML = '<a href="scores.html" class="win">You win! Your score is ' + score + '. <br />Click to see high scores.</a>';
      localStorage.setItem('allPictures', JSON.stringify(allPictures));
      } else {
        popup.setAttribute('class', 'popup');
        feedback.style.display = 'flex';
        feedback.style.color = 'red';
        feedback.innerHTML = '<a href="scores.html" class="lose">You lose! Your score is ' + score + '. <br />Click to see high scores.</a>';
    } //produce feedback
  }
  guessing = false;
}

function spotTwoClick () {
  if(guessing) {
    reveal();
    if(spotTwo.children[0].children[0].id === 'winner'){
      score = speed * shuffles;
      popup.setAttribute('class', 'popup');
      feedback.style.display = 'flex';
      feedback.style.color = 'green';
      feedback.innerHTML = '<a href="scores.html" class="win">You win! Your score is ' + score + '. <br />Click to see high scores.</a>';
      isHighScore(score);
    } else {
      popup.setAttribute('class', 'popup');
      feedback.style.display = 'flex';
      feedback.style.color = 'red';
      feedback.innerHTML = '<a href="scores.html" class="lose">You lose! Your score is ' + score + '. <br />Click to see high scores.</a>';
    } //produce feedback
  }
  guessing = false;
}

function spotThreeClick () {
  if(guessing) {
    reveal();
    if(spotThree.children[0].children[0].id === 'winner'){
      score = speed * shuffles;
      popup.setAttribute('class', 'popup');
      feedback.style.display = 'flex';
      feedback.style.color = 'green';
      feedback.innerHTML = '<a href="scores.html" class="win">You win! Your score is ' + score + '. <br />Click to see high scores.</a>';      isHighScore(score);
      isHighScore(score);
    } else {
      popup.setAttribute('class', 'popup');
      feedback.style.display = 'flex';
      feedback.style.color = 'red';
      feedback.innerHTML = '<a href="scores.html" class="lose">You lose! Your score is ' + score + '. <br />Click to see high scores.</a>';
    } //produce feedback
  }
  guessing = false;
}

function isHighScore (score) {
  highScores = highScores.sort(function(a, b){return a-b});
  for (var i = 0; i < highScores.length; i++) {
    if (score > highScores[i]) {
      highScores.splice(i+1, 0, score);
    }
  }

  while (highScores.length > 10) {
    highScores.shift();
  }
  localStorage.setItem('scores', JSON.stringify(highScores));
  return highScores;
}

setTimeout(function(){
  runGame();
}, 500);

spotOne.addEventListener('click', spotOneClick);
spotTwo.addEventListener('click', spotTwoClick);
spotThree.addEventListener('click', spotThreeClick);
