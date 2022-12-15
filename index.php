<html lang="en">
<head>
    <title>SOS</title>
    <script src="js/main.js" defer></script>
    <script src="js/queryParser.js" defer></script>
    <script src="js/graphic.js" defer></script>
    <script src="js/sos.js" defer></script>
    <script src="js/globals.js" defer></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <div id="gameArea">
        <canvas id="canvas"></canvas>
        <table id="gameTable">
            <?php if (!isset($_GET['n']) || !isset($_GET['m'])) { ?>
                <div class="bg-dark h-100 w-100 d-flex justify-content-center align-items-center">
                    <form action="" method='get'>
                        <div class="row text-white text-center">
                            <h1 class="fw-bold " style="padding-bottom: 50px !important; font-size: 60px; text-shadow: 2px 2px 4px #000000;">
                                <span class="text-decoration-line-through">SOS</span> Oyunu
                            </h1>
                            <hr>
                            <h1 class="pt-3">Tahta alanını seçiniz</h1>
                            <div class="d-flex justify-content-center">
                                <div class="p-3">
                                    <input class="form-control form-control-lg mt-4" type='number' name='n' placeholder='n'/>
                                    <input class="form-control form-control-lg mt-4" type='number' name='m' placeholder='m'/>
                                    <input class="form-control form-control-lg mt-4" type='submit' value='Başla'/>
                                    <!--
                                        <button type="submit" class="button mt-5 p-0" style="border: none !important;">
                                            <span class="text-white">asdfgh</span>
                                        </button>
                                    -->
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            <?php } else {
                $n = $_GET['n'];
                $m = $_GET['m'];

                // sanitize input
                try{
                    $n = intval($n);
                    $m = intval($m);
                    if ($n == 0 || $m == 0)
                        throw new Exception("Geçersiz Giriş");
                    if ($n < 3 || $m < 3)
                        throw new Exception("Boyutlar en azından 3x3 olmalıdır");
                } catch (Exception $e) {
                    echo $e->getMessage();
                    return;
                }

                // create table
                $idCounter = 0;
                for ($i = 0; $i < $n; $i++) { ?>
                    <tr>
                        <?php for ($j = 0; $j < $m; $j++) { ?>
                            <td data-row="<?=$i?>" data-col="<?=$j?>" id='t<?=$idCounter?>' onclick='tdclick(this)'>&nbsp</td>
                            <?php $idCounter += 1;
                        }?>
                    </tr>
                <?php
                }
            }
            ?>
        </table>
        <div id="scoreTable">
            <div id="scores">
                <p>Oyuncu Skoru: <span id='blue'>0</span></p>
                <p>Bilgisayar Skoru: <span id='red'>0</span></p>
            </div>
            <p id="turn"></p>
            <div id="textSelection">
                <p>Seçim: <span id="selectedText"></span>  </p>
                <button onclick="changeText()">Harfi Değiştir</button>
            </div>
            <div id="gameOptions">
                <button onclick="endGame()">Oyunu Bitir</button>
            </div>
        </div>
    </div>
</body>
</html>
