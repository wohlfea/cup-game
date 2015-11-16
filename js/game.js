var spotOne = document.getElementById('spotOne');
var spotTwo = document.getElementById('spotTwo');
var spotThree = document.getElementById('spotThree');
var red = document.getElementById('red');
var blue = document.getElementById('blue');
var yellow = document.getElementById('yellow');
var funcArray = [animateFirstToThird, animateSecondToOne, animateSecondToThird];
var options = [];

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
    spotOne.appendChild(childOfSpotThree);
    spotThree.appendChild(childOfSpotOne);
  }, 980)
}

function animateSecondToOne(childOfSpotOne, childOfSpotTwo) {
  childOfSpotTwo.setAttribute('class', 'twoToOne');
  childOfSpotOne.setAttribute('class', 'oneToTwo');
  setTimeout(function(){
    childOfSpotTwo.setAttribute('class', null);
    childOfSpotOne.setAttribute('class', null);
    spotOne.appendChild(childOfSpotTwo);
    spotTwo.appendChild(childOfSpotOne);
  }, 980)
}

function animateSecondToThird(childOfSpotTwo, childOfSpotThree) {
  childOfSpotTwo.setAttribute('class', 'twoToThree');
  childOfSpotThree.setAttribute('class', 'threeToTwo');
  setTimeout(function(){
    childOfSpotTwo.setAttribute('class', null);
    childOfSpotThree.setAttribute('class', null);
    spotTwo.appendChild(childOfSpotThree);
    spotThree.appendChild(childOfSpotTwo);
  }, 980)
}

function pickRandomShuffle() {
  var randomNumber = Math.floor(Math.random()*funcArray.length);
  if (randomNumber === 0) {
    funcArray[0](spotOne.children[0], spotThree.children[0]);
  } else if (randomNumber === 1) {
    funcArray[1](spotOne.children[0], spotTwo.children[0]);
  } else if (randomNumber === 2) {
    funcArray[2](spotTwo.children[0], spotThree.children[0]);
  }
}

function shuffle (i) {
   setTimeout(function () {
      console.log(i);
      pickRandomShuffle();
      if (--i) shuffle(i);
   }, 1000)
};

function assignRightAnswer() {
  var randomNumber = Math.floor(Math.random()*3);
  if (randomNumber === 0 ){
    spotOne.children[0].setAttribute('class', 'highlight');
    spotOne.children[0].setAttribute('id', 'winner');
  }else if(randomNumber === 1){
    spotTwo.children[0].setAttribute('class', 'highlight');
    spotTwo.children[0].setAttribute('id', 'winner');
  }else if(randomNumber === 2){
    spotThree.children[0].setAttribute('class', 'highlight');
    spotThree.children[0].setAttribute('id', 'winner');
  }
}

// console.log()
assignRightAnswer();

// shuffle(10); //Argument is however many times you want to shuffle
