<html lang="en">
<head>
    <title>SOS</title>
    <script
    src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
    crossorigin="anonymous"></script>
    <script src="main.js" defer></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div id="gameArea">
        <canvas id="canvas"></canvas>
        <table id="gameTable">
            <?php
            if (!isset($_GET['n']) || !isset($_GET['m'])) {
                echo "
                <tr>
                    <td>
                        <form action='index.php' method='get'>
                            <input type='text' name='n' placeholder='n'/>
                            <br />
                            <br />
                            <input type='text' name='m' placeholder='m'/>
                            <br />
                            <br />
                            <input style='width: 170px' type='submit' value='Start'/>
                        </form>
                    </td>
                </tr>
                ";
            } else {
                $n = $_GET['n'];
                $m = $_GET['m'];

                // sanitize input
                try{
                    $n = intval($n);
                    $m = intval($m);
                    if ($n == 0 || $m == 0)
                        throw new Exception("Invalid input");
                } catch (Exception $e) {
                    echo $e->getMessage();
                    return;
                }

                // create table
                $idCounter = 0;
                for ($i = 0; $i < $n; $i++) {
                    echo "<tr>";
                    for ($j = 0; $j < $m; $j++) {
                        echo "<td data-row=".$i." data-col=".$j." id='t".$idCounter."' onclick='tdclick(this)'>&nbsp</td>";
                        $idCounter += 1;
                    }
                    echo "</tr>";
                }
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
    </div>
</body>
</html>
