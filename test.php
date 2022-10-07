<html lang="en">
<head>
    <title>Document</title>
    <script
    src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
    crossorigin="anonymous"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            user-select: none;
        }

        #gameArea{
            background-color: #5f5f5f;
            width: 100%;
            height: 100%;
        }

        #gameTable{
            float: left;
            width: 80%;
            height: 80%;
            background-color: antiquewhite;
            border-spacing: 0px;
            table-layout:fixed;
        }

        #scoreTable{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 20%;
            height: 80%;
            background-color: rgb(43, 164, 89);
        }

        #details{
            width: 100%;
            height: 20%;
            background-color: rgb(145, 105, 53);
        }


        #gametable tr{
            margin: 0;
            padding: 0;
        }
        #gameTable td{
            margin: 0;
            padding: 0;
            border: 0.1px solid black;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            vertical-align: middle;
            font-size: 2em;
        }

        #gameTable td:hover{
            background-color: #5f5f5f;
        }

        #canvas {
            position: absolute;
            z-index: 999;
            pointer-events: none;
        }

    </style>
</head>
<body>
    <?php
    $n = 10;
    $m = 10;
    ?>

    <div id="gameArea">
        <canvas id="canvas"></canvas>
        <table id="gameTable">
            <?php
            $idCounter = 0;
            for ($i = 0; $i < $n; $i++) {
                echo "<tr>";
                for ($j = 0; $j < $m; $j++) {
                    echo "<td data-row=".$i." data-col=".$j." id='t".$idCounter."' onclick='tdclick(this)'>&nbsp</td>";
                    $idCounter += 1;
                }
                echo "</tr>";
            }
            ?>
        </table>
        <div id="scoreTable">
            <div id="textSelection">
                <p>Selected: </p>
                <p id="selectedText"></p>
                <button onclick="changeText()">Change Selection</button>
                <button onclick="undoMove()">Undo Move</button>
            </div>
        </div>
        <div id="details">
        </div>
    </div>
    <script>
        var selectedText = "S";
        var actionHistory = [];
        
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
                    "id": $id,
                    "rect": rect
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
                removeHorizontalLine($lastAction.rect);
                removeVerticalLine($lastAction.rect);
                document.getElementById($lastAction.id).innerHTML = "";
            }
        }
    </script>
</body>
</html>
