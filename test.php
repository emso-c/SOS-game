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
            background: no-repeat center center fixed;
            background-size: 100%;

        }


        #gameTable td:hover{
            background-color: #5f5f5f;
        }

        #canvas {
            position: absolute;
            z-index: 999;
            pointer-events: none;
        }

        .overlay {
            height:0px;
            overflow:visible;
            pointer-events:none;
            background:none !important;
        }

    </style>
</head>
<body>
    <?php
    $n = 3;
    $m = 3;
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
    </div>
    <script>
        var selectedText = "S";
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
            
            $row = elem.dataset.row;
            $col = elem.dataset.col;
            $id = elem.id
            document.getElementById($id).innerHTML = selectedText;
        };

        var canvas = document.getElementById("canvas");
        var gameTable = document.getElementById("gameTable");
        canvas.width = gameTable.offsetWidth;
        canvas.height = gameTable.offsetHeight;

    </script>
</body>
</html>
