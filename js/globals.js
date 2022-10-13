var selectedText = "O"; changeText();
var turn = "red"; changeTurn();
var actionHistory = [];
var redScore = 0;
var blueScore = 0;

var n = parseInt(parseQuery('n'));
var m = parseInt(parseQuery('m'));

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gameTable = document.getElementById("gameTable");
canvas.width = gameTable.offsetWidth;
canvas.height = gameTable.offsetHeight;

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
const elemSequenceOffsets = {
    'row': [0, 1, 2],
    'col': [0, m, 2*m],
    'diagonalLR': [0, m+1, 2*(m+1)],
    'diagonalRL': [0, m-1, 2*(m-1)],
}