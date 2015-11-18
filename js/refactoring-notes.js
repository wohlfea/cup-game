<section id='spotOne'>
  <section> //new div gets appended here @ end of animation
    <div> //gets id=winner, anim func called on this div
      <img src='images/slash/slash250.png'>
    </div>
  </section>
</section>

var allSpots = [];
var allImgs = [];

function Spots (id) {
  this.id = document.getElementById(id);
  this.spotSect = this.id.children[0];
  this.subDiv = this.id.children[0].children[0];
  this.pic = this.id.children[0].children[0].children[0];
  allSpots.push(this);
  allImgs.push(this.pic);
}

var spotOne = new Spot('spotOne');
var spotTwo = new Spot('spotTwo');
var spotThree = new Spot('spotThree');

function assignRightAnswer() {
  var randomNumber = Math.floor(Math.random()*3);
  allSpots[randomNumber].subDiv.setAttribute('id', 'winner');
  allSpots[randomNumber].pic.src = 'images/slash/owlslash250.png';
  setTimeout(function(){
    allSpots[randomNumber].pic.src = 'images/slash/slash250.png';
  })
}

var funcArray = [animateFirstToThird, animateSecondToOne, animateSecondToThird];

function pickSwapIndex() {
  var swapIndex = [];
  var a = Math.floor(Math.random()*3);
  swapIndex.push(a);
  var b = Math.floor(Math.random()*3);

  while (a === b) {
    b = Math.floor(Math.random()*3);
  }
  swapIndex.push(b);
  return swapIndex;
}//returns indices of two objects in allSpots to be animated

function defineAnimation(swapIndex) { //needs # of shuffles
  var a = swapIndex[0];
  var b = swapIndex[1];
  //var diff = b - a;
  var elemA = allSpots[a].subDiv;
  var elemB = allSpots[b].subDiv;
  var animA =

}

pickswapIndex();
animate(swapIndex);


function animateAtoB(elemA, elemB) {
  elemA.style.animation = 'AtoB' + speed + 'ms';
  elemB.style.animation = 'BtoA' + speed + 'ms';
}

function setAtoB(elemA) {

}

funcArray[0](allSpots[0].subDiv, allSpots[2].subDiv);
funcArray[0](spotOne.children[0].children[0], spotThree.children[0].children[0]);

function animateFirstToThird(childOfSpotOne, childOfSpotThree) {
  childOfSpotThree.style.animation = 'threeToOnes ' + speed + 'ms';
  childOfSpotOne.style.animation = 'oneToThrees ' + speed + 'ms';
  setTimeout(function(){
    childOfSpotOne.style.animation = null;
    childOfSpotThree.style.animation = null;
    spotOne.children[0].appendChild(childOfSpotThree);
    spotThree.children[0].appendChild(spotOne.children[0].children[0]);
    allSpots[2].spotSect.appendChild(childOfSpotOne)
  }, classTime)
}

//L-R px movement = ((index(swapA) - index(swapB)) * 350)px
//half of that @ 50% keyframe
//kf where A<B: bottom & left
//kf where A>B: top & right

@keyframes oneToThrees {
    0%   {bottom: 0px;
          left: 0px;}
    50%  {bottom: 300px;
          left: 350px;}
    100% {bottom: 0px;
          left: 700px;}
}
@keyframes threeToOnes {
    0%   {top: 0px;
          right: 0px;}
    50%  {top: 300px;
          right: 350px;}
    100% {top: 0px;
          right: 700px;}
}
