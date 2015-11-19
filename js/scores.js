var table = document.getElementsByTagName('table')[0];
var tbody = document.getElementsByTagName('tbody')[0];
var scores;

function makeTable(){
  var position = 1;
  for (var i = scores.length - 1; i > -1; i--) {
    var tr = document.createElement('tr');
    var rank = document.createElement('td');
    var user = document.createElement('td');
    var score = document.createElement('td');
    rank.innerHTML = position;
    user.innerHTML = scores[i].n;
    score.innerHTML = scores[i].s;
    tr.appendChild(rank);
    tr.appendChild(user);
    tr.appendChild(score);
    tbody.appendChild(tr);
    position++;
  }
}

function checkLocal() {
  if (localStorage.scores){
    scores = JSON.parse(localStorage.scores);
  }else {
    highScores = [{n:'AAA',s: 1000}, {n: 'ABB', s: 1200}, {n: 'BBB', s: 1400}, {n: 'CCC', s: 1600}, {n: 'DDD', s: 1800}];
  }
}

checkLocal();
makeTable();
