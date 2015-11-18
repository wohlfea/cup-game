var spotOne = document.getElementById('spotOne');
var spotTwo = document.getElementById('spotTwo');
var spotThree = document.getElementById('spotThree');
var feedback = document.getElementById('feedback');
var popup = document.getElementById('popup');
var funcArray = [animateFirstToThird, animateSecondToOne, animateSecondToThird];
var options = [];
var guessing = false;
var speed;
var speedFactor;
var classTime;
var shuffles;
//var shFactor;
var score = 0;
var highScores;
var allSpots = [];

function Spot(num) {
  this.spotSect = num.children[0];
  this.subDiv = num.children[0].children[0];
  this.pic = num.children[0].children[0].children[0];
  allSpots.push(this);
}

var spotOne = new Spot(spotOne);
var spotTwo = new Spot(spotTwo);
var spotThree = new Spot(spotThree);

function init() {
  if (localStorage.scores){
    highScores = JSON.parse(localStorage.scores);
  } else {
    highScores = [{n:'AAA',s: 4}, {n: 'ABB', s: 3}, {n: 'BBB', s: 5}, {n: 'CCC', s: 6}, {n: 'DDD', s: 1}];
  }
}

function getOptions() {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split("=");
    options[i] = pair[1]
  };
}

function parseOptions(options) {
  if (options[0] === "Slow") {
    speed = 1500;
    speedFactor = 500;
  } else if (options[0] === "Medium") {
    speed = 1000;
    speedFactor = 1000;
  } else {
    speed = 500;
    speedFactor = 1500;
  };
  classTime = speed - 20;
  shuffles = parseInt(options[1]);
  return speed, speedFactor, shuffles;
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
  var one = allSpots[0].subDiv;
  var two = allSpots[1].subDiv;
  var three = allSpots[2].subDiv;

  if (randomNumber === 0) {
    funcArray[0](one, three);
    console.log('one:'+one);
    console.log('three:'+three);
  } else if (randomNumber === 1) {
    funcArray[1](one, two);
    console.log('one:'+one);
    console.log('two'+two);
  } else if (randomNumber === 2) {
    funcArray[2](two, three);
    console.log('two'+two);
    console.log('three:'+three);
  }
}

function shuffle (s, i) {
   setTimeout(function () {
      pickRandomShuffle();
      if (--i) {
        shuffle(speed, i);
      } else {
        guessing = true;
      }
   }, s)
}

function assignRightAnswer() {
  var randomNumber = Math.floor(Math.random()*3);
  allSpots[randomNumber].subDiv.setAttribute('id', 'winner');
  allSpots[randomNumber].pic.src = 'images/slash/owlslash250.png';
  setTimeout(function(){
    allSpots[randomNumber].pic.src = 'images/slash/slash250.png';
  },1000);
}

/*function assignRightAnswer() {
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
}*/

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
    if(allSpots[0].subDiv.id === 'winner'){
      score = speedFactor * shuffles;
      isHighScore(score);
      popup.setAttribute('class', 'popup');
      feedback.innerHTML = '<a href="scores.html" class="win">You win! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
      } else {
        popup.setAttribute('class', 'popup');
        feedback.innerHTML = '<a href="scores.html" class="lose">You lose! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
    }
  }
  guessing = false;
  return score;
}

function spotTwoClick () {
  if(guessing) {
    reveal();
    if(allSpots[1].subDiv.id === 'winner'){
      score = speedFactor * shuffles;
      popup.setAttribute('class', 'popup');
      feedback.innerHTML = '<a href="scores.html" class="win">You win! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
      isHighScore(score);
    } else {
      popup.setAttribute('class', 'popup');
      feedback.innerHTML = '<a href="scores.html" class="lose">You lose! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
    }
  }
  guessing = false;
  return score;
}

function spotThreeClick () {
  if(guessing) {
    reveal();
    if(allSpots[2].subDiv.id === 'winner'){
      score = speedFactor * shuffles;
      popup.setAttribute('class', 'popup');
      feedback.innerHTML = '<a href="scores.html" class="win">You win! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
      isHighScore(score);
    } else {
      popup.setAttribute('class', 'popup');
      feedback.innerHTML = '<a href="scores.html" class="lose">You lose! <br />Your score is ' + score + '.<br />Click to see high scores.</a>';
    }
  }
  guessing = false;
  return score;
}

function isHighScore (score) {
  var curScore = {n: 'zzz', s: score};

  highScores = highScores.sort(function(a, b) {
    return a.s-b.s;
  });

  for (var i = 0; i < highScores.length; i++) {
    if (score > highScores[i].s) {
      highScores.splice(i+1, 0, curScore);
      break;
    }
  }

  highScores = highScores.sort(function(a, b) {
    return a.s-b.s;
  });

  while (highScores.length > 10) {
    highScores.shift();
  }
  localStorage.setItem('scores', JSON.stringify(highScores));
  return highScores;
}

init();
setTimeout(function(){
  runGame();
}, 500);

spotOne.addEventListener('click', spotOneClick);
spotTwo.addEventListener('click', spotTwoClick);
spotThree.addEventListener('click', spotThreeClick);
