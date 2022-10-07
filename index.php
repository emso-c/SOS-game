<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script
    src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
    crossorigin="anonymous"></script>
    <script src="main.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php
    $n = 10;
    $m = 10;
    ?>

    <div id="gameArea">
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
</body>
</html>
