var selectedText = "S";
var actionHistory = [];
var turn = "red";
var redScore = 0;
var blueScore = 0;
changeTurn();

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
var n = parseInt(getQueryVariable('n'));
var m = parseInt(getQueryVariable('m'));

var canvas = document.getElementById("canvas");
var gameTable = document.getElementById("gameTable");
canvas.width = gameTable.offsetWidth;
canvas.height = gameTable.offsetHeight;

function drawHorizontalLine(rect){
    var middleX = (rect.right + rect.left) / 2;
    var middleY = (rect.bottom + rect.top) / 2;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(rect.left, middleY);
    ctx.lineTo(rect.right, middleY);
    ctx.stroke();
}
function removeHorizontalLine(rect){
    var middleX = (rect.right + rect.left) / 2;
    var middleY = (rect.bottom + rect.top) / 2;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(rect.left, middleY - 1, rect.right - rect.left, 2);
}
function removeVerticalLine(rect){
    var middleX = (rect.right + rect.left) / 2;
    var middleY = (rect.bottom + rect.top) / 2;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(middleX - 1, rect.top, 2, rect.bottom - rect.top);
}
function drawVerticalLine(rect){
    var middleX = (rect.right + rect.left) / 2;
    var middleY = (rect.bottom + rect.top) / 2;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(middleX, rect.top);
    ctx.lineTo(middleX, rect.bottom);
    ctx.stroke();
}
function drawDoubleLine(rect){
    drawVerticalLine(rect, rect.top, rect.bottom);
    drawHorizontalLine(rect, rect.left, rect.right);
}

function changeText(){
    selectedText = (selectedText == "S") ? "O" : "S";
    document.getElementById("selectedText").innerHTML = selectedText;
}

function undoMove(){
    if(actionHistory.length > 0){
        $lastAction = actionHistory.pop();
        removeHorizontalLine($lastAction.rect);
        removeVerticalLine($lastAction.rect);
        document.getElementById($lastAction.id).innerHTML = "";
    }
}

function changeTurn(){
    turn = (turn == "blue") ? "red" : "blue";
    document.getElementById("turn").innerHTML = turn;
}

function tdclick(elem){ 
    /* var rect = elem.getBoundingClientRect();
    drawHorizontalLine(rect);
    drawVerticalLine(rect); */
    if(elem.innerHTML!="&nbsp;"){
        return;
    }
    var potential_soses = findSOSes();

    // player move
    elem.innerHTML = selectedText;
    /* actionHistory.push(
        {
            "row": elem.dataset.row,
            "col": elem.dataset.col,
            "text": selectedText,
            "id": elem.id,
            "rect": elem.getBoundingClientRect()
        }
    ); */
    
    // check soses found by player
    for(var i = 0; i < potential_soses.length; i++){
        if(potential_soses[i][1] == elem.id.substring(1)){
            blueScore += 1;
            document.getElementById("blue").innerHTML = 'Blue Team Score: ' + blueScore;
            return;
        }
    }

    // change turn
    changeTurn();
    
    // AI move
    soses = findSOSes();
    while(soses.length!=0){
        placeSoses(soses);
        soses = findSOSes();
    }
    makeRandomMove();
};

function placeSoses(soses){
    for (const sos of soses) {
        coordiantes = sos[0];
        id = sos[1];
        text = sos[2];
        elem = document.getElementById('t'+id);
        elem.innerHTML = text;
        redScore += 1;
        document.getElementById("red").innerHTML = 'Red Team Score: ' + redScore;
    }
}

function findSOSes(){
    soses = [];
    // row search
    for(var id = 0; id < (n*m)-1; id++){
        elem = document.getElementById('t'+id);
        if (elem.innerHTML == 'S'){
            val = document.getElementById('t'+(id+1)).innerHTML
            if (val == '&nbsp;'){
                val = document.getElementById('t'+(id+2)).innerHTML
                if (val == 'S'){
                    soses.push([[id, id+1, id+2], id+1, 'O']);
                    id=id+1;
                }
            }
        } 
        if (elem.innerHTML == '&nbsp;'){
            val = document.getElementById('t'+(id+1)).innerHTML
            if (val == 'O'){
                val = document.getElementById('t'+(id+2)).innerHTML
                if (val == 'S'){
                    soses.push([[id, id+1, id+2], id, 'S']);
                    id=id+1;
                }
            }
        } 
        if (elem.innerHTML == 'S'){
            val = document.getElementById('t'+(id+1)).innerHTML;
            if (val == 'O'){
                val = document.getElementById('t'+(id+2)).innerHTML;
                if (val == '&nbsp;'){
                    soses.push([[id, id+1, id+2], id+2, 'S']);
                    id=id+1;
                }
            }
        }
        
        if (id % m == 4){
            id += 2;
        }
    }
    
    // col search
    for(var id = 0; id < (n*m)-(2*m); id++){

        elem = document.getElementById('t'+id);
        if (elem.innerHTML == 'S'){
            val = document.getElementById('t'+(id+m)).innerHTML
            if (val == '&nbsp;'){
                val = document.getElementById('t'+(id+2*m)).innerHTML
                if (val == 'S'){
                    soses.push([[id, id+m, id+2*m], id+m, 'O']);
                    id=id+1;
                }
            }
        }
        if (elem.innerHTML == '&nbsp;'){
            val = document.getElementById('t'+(id+m)).innerHTML
            if (val == 'O'){
                val = document.getElementById('t'+(id+2*m)).innerHTML
                if (val == 'S'){
                    soses.push([[id, id+m, id+2*m], id, 'S']);
                    id=id+1;
                }
            }
        }
        if (elem.innerHTML == 'S'){
            val = document.getElementById('t'+(id+m)).innerHTML;
            if (val == 'O'){
                val = document.getElementById('t'+(id+2*m)).innerHTML;
                if (val == '&nbsp;'){
                    soses.push([[id, id+m, id+2*m], id+2*m, 'S']);
                    id=id+1;
                }
            }
        }
    }
    return soses;
}

function makeRandomMove(){
    var randomId = Math.floor(Math.random() * (n*m));
    var randomText = (Math.random() < 0.5) ? "S" : "O";
    elem = document.getElementById('t'+randomId);
    while(elem.innerHTML != "&nbsp;"){
        randomId = Math.floor(Math.random() * (n*m));
        elem = document.getElementById('t'+randomId);
    }
    elem.innerHTML = randomText;
}
