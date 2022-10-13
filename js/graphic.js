function drawHorizontalLine(rect){
    var middleY = (rect.bottom + rect.top) / 2;
    ctx.beginPath();
    ctx.moveTo(rect.left, middleY);
    ctx.lineTo(rect.right, middleY);
    ctx.stroke();
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