function tdclick(elem){ 
    if(elem.innerHTML!="&nbsp;")
        return;

    var potentialSoses = findSOSes();

    // player move
    elem.innerHTML = selectedText;
    
    // check soses found by player
    for(var i = 0; i < potentialSoses.length; i++){
        var sos_id = potentialSoses[i][1];
        var elem_id = elem.id.substring(1);
        if(sos_id == elem_id){
            var coordinates = potentialSoses[i][0];
            drawLine(coordinates);
            addScore(turn);
            return;
        }
    }

    changeTurn();
    $("body").css("pointer-events", "none");
    setTimeout(AIMove, 1000); 
};

function AIMove(){
    soses = findSOSes();
    while(soses.length!=0){
        placeSoses(soses);
        soses = findSOSes();
    }
    checkAIEnd();
    changeTurn();
    $("body").css("pointer-events", "");
}

function checkAIEnd(){
    emptyCount = countEmpties();
    if(emptyCount == 0){
        endGame();
        return;
    }
    else if(emptyCount == 1){
        makeRandomMove();
        endGame();
    }
    else{
        makeRandomMove();
    }
    changeTurn();
}