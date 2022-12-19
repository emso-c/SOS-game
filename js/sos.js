
function changeText(){
    selectedText = (selectedText == "S") ? "O" : "S";
    document.getElementById("selectedText").innerHTML = selectedText;

}

function changeTurn(){
    turn = (turn == "blue") ? "red" : "blue";
    turnText = (turn == "blue") ? "Oyuncu" : "Bilgisayar";
    document.getElementById("turn").innerHTML = turnText;
}

function placeSoses(soses){
    // bilgisayara sosları koydur
    for (const sos of soses) {
        coordiantes = sos[0];
        id = sos[1];
        text = sos[2];
        elem = document.getElementById('t'+id);
        elem.innerHTML = text;
        drawLine(coordiantes);
        addScore('red');
    }
}

function addScore(player){
    if(player == "red"){
        redScore++;
        document.getElementById("red").innerHTML = redScore;
    }
    else{
        blueScore++;
        document.getElementById("blue").innerHTML = blueScore;
    }
}

// hücrenin içindeki text ile bir karakteri karşılaştır
function checkCellEqual(id, char){
    return document.getElementById('t'+id).innerHTML == char;
}

function checkSOS(id, direction){
    // verilen kutuda ve yönde bir sos var mı
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
        
        // 3 bilgi döndürüyoruz
        // [id1, id2, id3]: sos bulunan hücre id'leri
        // id+elemSequenceOffsets[direction][condition.offsetIndex]: sos konulacak id konumu
        // condition.charToReplace: Konulacak harf
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

function countEmpties(){
    var count = 0;
    for(var i = 0; i < n*m; i++){
        elem = document.getElementById('t'+i);
        if(elem.innerHTML == "&nbsp;")
            count++;
    }
    return count;
}

function getWinnerText(){
    if(redScore > blueScore){
        return "Bilgisayar kazandı!";
    }
    else if(blueScore > redScore){
        return "Oyuncu kazandı!";
    }
    return "Berabere!";
}

function endGame(){
    let winnerText = getWinnerText();
    $('#endGameModal').modal('show');
    $('#winner').text(winnerText);
}
