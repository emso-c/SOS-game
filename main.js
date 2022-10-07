window.oncontextmenu = function() {
    // return false;
};

const Images = {
    "horizontal": "url(images/horizontal_line.png)",
    "vertical": "url(images/vertical_line.png)",
    "double": "url(images/double_line.png)",
};

var actionHistory = [];
var selectedText = "S";

function tdclick(elem){ 
    $('#t1').css("background-image", Images.horizontal);  
    $('#t2').css("background-image", Images.double);  
    $('#t3').css("background-image", Images.horizontal);  
    $('#t4').css("background-image", Images.horizontal);  
    $('#t5').css("background-image", Images.horizontal);  
    /* var rect = elem.getBoundingClientRect();
    var middleX = (rect.right + rect.left) / 2;
    var middleY = (rect.bottom + rect.top) / 2;
    var middle = (middleX + middleY) / 2;   
    console.log(middleX, middleY, middle); */
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

