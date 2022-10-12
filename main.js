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

const sosConditions = [
    {
        'sequence': ['&nbsp;', 'O', 'S'],
        'charToPlace': 'S',
        'offsetIndex': 0
    },
    {
        'sequence': ['S', '&nbsp;', 'S'],
        'charToPlace': 'O',
        'offsetIndex': 1
    },
    {
        'sequence': ['S', 'O', '&nbsp;'],
        'charToPlace': 'S' ,
        'offsetIndex': 2
    }
]
const elemSequenceOffsets = {
    'row': [0, 1, 2],
    'col': [0, m, 2*m],
    'diagonalLR': [0, m+1, 2*(m+1)],
    'diagonalRL': [0, m-1, 2*(m-1)],
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gameTable = document.getElementById("gameTable");
canvas.width = gameTable.offsetWidth;
canvas.height = gameTable.offsetHeight;

function drawHorizontalLine(rect){
    console.log("drawing horizontal line");
    var middleY = (rect.bottom + rect.top) / 2;
    ctx.beginPath();
    ctx.moveTo(rect.left, middleY);
    ctx.lineTo(rect.right, middleY);
    ctx.stroke();
    console.log("drawed horizontal line");
}
function drawVerticalLine(rect){
    var middleX = (rect.right + rect.left) / 2;
    ctx.beginPath();
    ctx.moveTo(middleX, rect.top);
    ctx.lineTo(middleX, rect.bottom);
    ctx.stroke();
}
function drawDiagonalLRLine(rect){
    ctx.beginPath();
    ctx.moveTo(rect.left, rect.top);
    ctx.lineTo(rect.right, rect.bottom);
    ctx.stroke();
}
function drawDiagonalRLLine(rect){
    ctx.beginPath();
    ctx.moveTo(rect.right, rect.top);
    ctx.lineTo(rect.left, rect.bottom);
    ctx.stroke();
}
/* function removeHorizontalLine(rect){
    var middleY = (rect.bottom + rect.top) / 2;
    ctx.clearRect(rect.left, middleY - 1, rect.right - rect.left, 2);
}
function removeVerticalLine(rect){
    var middleX = (rect.right + rect.left) / 2;
    ctx.clearRect(middleX - 1, rect.top, 2, rect.bottom - rect.top);
} */

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
        var coordiantes = sos[0];
        id = sos[1];
        text = sos[2];
        elem = document.getElementById('t'+id);
        elem.innerHTML = text;
        drawLine(coordiantes);
        redScore += 1;
        document.getElementById("red").innerHTML = 'Red Team Score: ' + redScore;
    }
}

function checkCellEqual(id, char){
    return document.getElementById('t'+id).innerHTML == char;
}

function checkSOS(id, direction){
    var id1 = id+elemSequenceOffsets[direction][0];
    var id2 = id+elemSequenceOffsets[direction][1];
    var id3 = id+elemSequenceOffsets[direction][2];

    for (const condition of sosConditions) {
        if (!checkCellEqual(id1, condition.sequence[0]))
            continue;
        if (!checkCellEqual(id2, condition.sequence[1]))
            continue;
        if (!checkCellEqual(id3, condition.sequence[2]))
            continue;
        return [[id1, id2, id3], id+elemSequenceOffsets[direction][condition.offsetIndex], condition.charToPlace];
    }
}

function findSOSes(){
    soses = [];
    // row search
    for(var id = 0; id < (n*m)-1; id++){
        var rowSos = checkSOS(id, 'row');
        if(rowSos){
            soses.push(rowSos);
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
        var colSos = checkSOS(id, 'col');
        if(colSos){
            soses.push(colSos);
        }
    }

    // diagonal search left to right
    for(var id = 0; id < (n*m)-(2*(m+1)); id++){
        if((id % m) == (m-2)){
            id++;
            continue;
        }
        var diagonalSos = checkSOS(id, 'diagonalLR');
        if(diagonalSos){
            soses.push(diagonalSos);
            console.log("LR:"+ diagonalSos);
        }
    }
    
    // diagonal search right to left
    for(var id = 2; id < (n*m)-(2*m); id++){
        if((id % m) == 0){
            id++;
            continue;
        }
        var diagonalSos = checkSOS(id, 'diagonalRL');
        if(diagonalSos){
            soses.push(diagonalSos);
            console.log("RL:"+ diagonalSos);
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

function getDirection(coordinates){
    if(coordinates[0] == coordinates[1] - elemSequenceOffsets.row[1])
        return 'horizontal';
    else if(coordinates[0] == coordinates[1] - elemSequenceOffsets.col[1])
        return 'vertical';
    else if(coordinates[0] == coordinates[1] - elemSequenceOffsets.diagonalLR[1])
        return 'diagonalLR';
    else if(coordinates[0] == coordinates[1] - elemSequenceOffsets.diagonalRL[1])
        return 'diagonalRL';
}
function drawLine(coordinates){
    var direction = getDirection(coordinates);
    for(var j = 0; j < coordinates.length; j++){
        var rect = document.getElementById("t" + coordinates[j]).getBoundingClientRect();
        if(direction == "horizontal")
            drawHorizontalLine(rect);
        else if(direction == "vertical")
            drawVerticalLine(rect);
        else if(direction == "diagonalLR")
            drawDiagonalLRLine(rect);
        else if(direction == "diagonalRL")
            drawDiagonalRLLine(rect);
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