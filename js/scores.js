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
    scores = [{n:'AAA',s: 4}, {n: 'ABB', s: 3}, {n: 'BBB', s: 5}, {n: 'CCC', s: 6}, {n: 'DDD', s: 1}];
  }
}

checkLocal();
makeTable();
