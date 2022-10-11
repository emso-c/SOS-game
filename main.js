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
var ctx = canvas.getContext("2d");
var gameTable = document.getElementById("gameTable");
canvas.width = gameTable.offsetWidth;
canvas.height = gameTable.offsetHeight;

function drawHorizontalLine(rect){
    var middleY = (rect.bottom + rect.top) / 2;
    ctx.beginPath();
    ctx.moveTo(rect.left, middleY);
    ctx.lineTo(rect.right, middleY);
    ctx.stroke();
}
function removeHorizontalLine(rect){
    var middleY = (rect.bottom + rect.top) / 2;
    ctx.clearRect(rect.left, middleY - 1, rect.right - rect.left, 2);
}
function removeVerticalLine(rect){
    var middleX = (rect.right + rect.left) / 2;
    ctx.clearRect(middleX - 1, rect.top, 2, rect.bottom - rect.top);
}
function drawVerticalLine(rect){
    var middleX = (rect.right + rect.left) / 2;
    ctx.beginPath();
    ctx.moveTo(middleX, rect.top);
    ctx.lineTo(middleX, rect.bottom);
    ctx.stroke();
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
    if(elem.innerHTML!="&nbsp;")
        return;

    var potential_soses = findSOSes();

    // player move
    elem.innerHTML = selectedText;
    
    // check soses found by player
    for(var i = 0; i < potential_soses.length; i++){
        var sos_id = potential_soses[i][1];
        var elem_id = elem.id.substring(1);
        if(sos_id == elem_id){
            var coordinates = potential_soses[i][0];
            drawLine(coordinates);
            blueScore += 1;
            document.getElementById("blue").innerHTML = 'Blue Team Score: ' + blueScore;
            return;
        }
    }

    // AI move
    changeTurn();
    soses = findSOSes();
    while(soses.length!=0){
        placeSoses(soses);
        soses = findSOSes();
    }
    emptyCount = countEmpties();
    if(emptyCount == 0){
        console.log("Game Over");
        return;
    }
    else if(emptyCount == 1){
        makeRandomMove();
        console.log("Game Over");
    }
    else{
        makeRandomMove();
    }
};

function placeSoses(soses){
    for (const sos of soses) {
        coordiantes = sos[0];
        id = sos[1];
        text = sos[2];
        elem = document.getElementById('t'+id);
        elem.innerHTML = text;
        drawLine(coordiantes);
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
                }
            }
        } 
        if (elem.innerHTML == '&nbsp;'){
            val = document.getElementById('t'+(id+1)).innerHTML
            if (val == 'O'){
                val = document.getElementById('t'+(id+2)).innerHTML
                if (val == 'S'){
                    soses.push([[id, id+1, id+2], id, 'S']);
                }
            }
        } 
        if (elem.innerHTML == 'S'){
            val = document.getElementById('t'+(id+1)).innerHTML;
            if (val == 'O'){
                val = document.getElementById('t'+(id+2)).innerHTML;
                if (val == '&nbsp;'){
                    soses.push([[id, id+1, id+2], id+2, 'S']);
                }
            }
        }

        if(m == 3){
            id += 2;
        }
        else if(m == 4){
            if (id % m == (m-3)){
                id += 2;
            }    
        }
        else{
            if (id % m == (m-3)){
                id += 2;
            }
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
    var randomId = Math.floor(  Math.random() * (n*m));
    var randomText = (Math.random() < 0.5) ? "S" : "O";
    elem = document.getElementById('t'+randomId);
    while(elem.innerHTML != "&nbsp;"){
        randomId = Math.floor(Math.random() * (n*m));
        elem = document.getElementById('t'+randomId);
    }
    elem.innerHTML = randomText;
}

function isGameOver(){
    // check if there is any empty cell
    for(var i = 0; i < n*m; i++){
        elem = document.getElementById('t'+i);
        if(elem.innerHTML == "&nbsp;")
            return false;
    }
    return true;
}

function drawLine(coordinates){
    function getDirection(){
        if(coordinates[0] == coordinates[1]-1)
            return "horizontal";
        else
            return "vertical";
    }
    // foreach coordinate
    for(var j = 0; j < coordinates.length; j++){
        var rect = document.getElementById("t" + coordinates[j]).getBoundingClientRect();
        if(getDirection() == "horizontal")
            drawHorizontalLine(rect);
        else
            drawVerticalLine(rect);
    }
}

function countEmpties(){
    var count = 0;
    for(var i = 0; i < n*m; i++){
        elem = document.getElementById('t'+i);
        if(elem.innerHTML == "&nbsp;")
            count++;
    }
    return count;
}

/* actionHistory.push(
            {
                "row": elem.dataset.row,
                "col": elem.dataset.col,
                "text": selectedText,
                "id": elem.id,
                "rect": elem.getBoundingClientRect()
            }
        ); */