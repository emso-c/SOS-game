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
            addScore(turn);
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
};
