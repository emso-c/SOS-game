window.oncontextmenu = function() {
    // return false;
};

var canvas = document.getElementById("canvas");
var gameTable = document.getElementById("gameTable");
canvas.width = gameTable.offsetWidth;
canvas.height = gameTable.offsetHeight;

var actionHistory = [];
var selectedText = "S";

function drawHorizontalLine(rect){
    var middleY = (rect.bottom + rect.top) / 2;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(rect.left, middleY);
    ctx.lineTo(rect.right, middleY);
    ctx.stroke();
}
function drawVerticalLine(rect){
    var middleX = (rect.right + rect.left) / 2;
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

function tdclick(elem){
    var rect = elem.getBoundingClientRect();
    drawHorizontalLine(rect);
    drawVerticalLine(rect); 

    $row = elem.dataset.row;
    $col = elem.dataset.col;
    $id = elem.id
    console.log($row, $col, $id);
    document.getElementById($id).innerHTML = selectedText;
    actionHistory.push(
        {
            "row": $row,
            "col": $col,
            "text": selectedText,
            "id": $id
        }
    );
};

function changeText(){
    selectedText = (selectedText == "S") ? "O" : "S";
    document.getElementById("selectedText").innerHTML = selectedText;
}

function undoMove(){
    if(actionHistory.length > 0){
        $lastAction = actionHistory.pop();
        document.getElementById($lastAction.id).innerHTML = "";
    }
}

