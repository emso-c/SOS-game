// seçilen text renderlansın diye fonksiyonu çağırdık
var selectedText = "O"; changeText();
var turn = "red"; changeTurn();

var redScore = 0;
var blueScore = 0;

// URL'den n ve m değerlerini çekip int'e çevirdik
var n = parseInt(parseQuery('n'));
var m = parseInt(parseQuery('m'));

// çizim için gereken değişkenleri tanımladık

// tuval
var canvas = document.getElementById("canvas");
// fırça
var ctx = canvas.getContext("2d");

// canvas boyutlarını oyun alanıyla eşitle
var gameTable = document.getElementById("gameTable");
canvas.width = gameTable.offsetWidth;
canvas.height = gameTable.offsetHeight;
ctx.strokeStyle = 'red';
ctx.lineWidth = 3;


// sos durumlarını tanımla
const sosConditions = [
    {
        'sequence': ['&nbsp;', 'O', 'S'],
        'charToPlace': 'S',
        'offsetIndex': 0
    },
    {
        'sequence': ['S', '&nbsp;', 'S'],
        'charToPlace': 'O',
        'offsetIndex': 1
    },
    {
        'sequence': ['S', 'O', '&nbsp;'],
        'charToPlace': 'S' ,
        'offsetIndex': 2
    }
]

// sos olması için gereken koordinatlar (sos türü/tipi)
const elemSequenceOffsets = {
    'row': [0, 1, 2],
    'col': [0, m, 2*m],
    'diagonalLR': [0, m+1, 2*(m+1)],
    'diagonalRL': [0, m-1, 2*(m-1)],
}