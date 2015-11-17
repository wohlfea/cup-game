var table = document.getElementsByTagName('table')[0];
var tbody = document.getElementsByTagName('tbody')[0];
var scores;

function makeTable(){
  for (var i = 0; i < scores.length; i++) {
    var tr = document.createElement('tr');
    var rank = document.createElement('td');
    var user = document.createElement('td');
    var score = document.createElement('td');
    rank.innerHTML = i + 1;
    user.innerHTML = scores[i][0];
    score.innerHTML = scores[i][1];
    tr.appendChild(rank);
    tr.appendChild(user);
    tr.appendChild(score);
    tbody.appendChild(tr);
  }
}

function checkLocal() {
  if (localStorage.scores){
    scores = JSON.parse(localStorage.scores);
  }else {
    scores = [['AAA',3],['ABB',3],['BBB',3],['CCC',3],['DDD',3]];
  }
}

checkLocal();
makeTable();
