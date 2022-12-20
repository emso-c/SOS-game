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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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

                // sanitize
                try{
                    $n = intval($n);
                    $m = intval($m);
                    if ($n == 0 || $m == 0)
                        throw new Exception("Geçersiz Giriş");
                    if ($n < 3 || $m < 3)
                        throw new Exception("Boyutlar en azından 3x3 olmalıdır");
                } catch (Exception $e) {
                    echo "<p class='text-dark'>".$e->getMessage();
                    return;
                }

                // create table
                $idCounter = 0;
                for ($i = 0; $i < $n; $i++) { ?>
                    <tr>
                        <?php for ($j = 0; $j < $m; $j++) { ?>
                            <td class="text-white" style="font-size: 3em" data-row="<?=$i?>" data-col="<?=$j?>" id='t<?=$idCounter?>' onclick='tdclick(this)'>&nbsp</td>
                            <?php $idCounter += 1;
                        }?>
                    </tr>
                <?php
                }
            }
            ?>
        </table>
        <div id="scoreTable">
            <div id="scores" class="w-75">
                <table class="table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Oyuncu</th>
                            <th scope="col">Skor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="player1">Oyuncu</td>
                            <td><span id='blue'>0</span></td>
                        </tr>
                        <tr>
                            <td id="player2">Bilgisayar</td>
                            <td><span id='red'>0</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p id="turnText">Sıra <span id="turn"></span>'da</p>
            
            <div id="textSelection" class="d-flex justify-content-center text-center">
                <div class="row">
                    <p>Harf Seçimi: <span id="selectedText"></span></p>
                    <button class="btn btn-dark" onclick="changeText()">Harfi Değiştir</button>

                </div>
            </div>
            <div id="gameOptions" class="d-flex justify-content-center text-center">
                <button class="btn btn-danger m-1" onclick="endGame()">Oyunu Bitir</button>
                <button class="btn btn-danger m-1" onclick="location.reload()">Yeniden Oyna</button>
            </div>
        </div>
    </div>


    <div class="modal fade" id="endGameModal" tabindex="-1" aria-labelledby="endGameModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h5 class="modal-title text-white text-shadow" id="endGameModalLabel">Oyun Bitti!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="text-center" style="font-size: 30px; text-shadow: 2px 2px 20px #000;" id="winner">test</p>
                    <div class="d-flex justify-content-center text-center">
                        <button class="btn btn-sm btn-danger" onclick="location.reload()">Yeniden Oyna</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
