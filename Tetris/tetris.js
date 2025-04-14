var ctx = document.getElementById("myCanvas");
var canvas = ctx.getContext("2d");
var ctx2 = document.getElementById("nextShapeCanvas");
var nextShapeCanvas = ctx2.getContext("2d");
var player = {x:200,y:200}
var img = document.getElementById("image");
var ctx3 = document.getElementById("gameScore");
var gameScoreCanvas = ctx3.getContext("2d");
gameScoreCanvas.font = "25px Arial";
gameScoreCanvas.fillText("Gamescore: 0", ctx3.clientWidth/32,ctx3.clientHeight/2);
var scoreNumber = 0;

function updateScore(score){
    gameScoreCanvas.clearRect(0,0,1000,1000);
    gameScoreCanvas.fillText("Gamescore: " + score,ctx3.clientWidth/32,ctx3.clientHeight/2)    ;
}

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class Tetromino{

    constructor(x, y, shape, color){
        this.position = new Point(x,y);
        this.shape = shape;
        this.color = color;
        this.tmpPoint = new Point(x,y);
    }
    
    rotate(){
        for (let y = 0; y < this.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
              [this.shape[x][y], this.shape[y][x]] = 
              [this.shape[y][x], this.shape[x][y]];
            }
          }
          
          // Reverse the order of the columns.
          this.shape.forEach(row => row.reverse());
    }

    moveDown(){
        this.tmpPoint.y += 28;
        this.tmpPoint.x = this.position.x;
    }

    moveLeft(){
        this.tmpPoint.x -= 28;
        this.tmpPoint.y = this.position.y;
    }

    moveRight(){
        this.tmpPoint.x += 28;
        this.tmpPoint.y = this.position.y;
    }

    update(){
        this.position.x = this.tmpPoint.x;
        this.position.y = this.tmpPoint.y;
        
    }
}



function setUpGameBoard(){
    canvas.fillStyle = "white";
    for(var i = 0; i < 11; i++){
        canvas.fillRect(28 * i,0,4,700);
    }
    for(var j = 0; j < 22; j++){
        canvas.fillRect(0,28 * j,700,4);
    }
}
var purpleColor = {
    x:0,
    y:144
}

var yellowColor = {
    x:0,
    y:72
}

var lightblueColor = {
    x:0,
    y:24
}
var darkblueColor = {
    x:0,
    y:0
}

var greenColor = {
    x:0,
    y:48
}

var redColor = {
    x:0,
    y:120
}

const gameboard = [
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}],
    [{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0},{color: null, type: 0}]
];
const colorData = [redColor, yellowColor, purpleColor, lightblueColor, greenColor, darkblueColor];
const shapes = [[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
[[0,1,1],[0,0,1],[0,0,1]],
[[1,1,0],[1,0,0],[1,0,0]],
[[1,1,0],[1,1,0],[0,0,0]],
[[0,0,0],[0,1,0],[1,1,1]],
[[0,1,0],[0,1,1],[0,0,1]],
[[0,1,0],[1,1,0],[1,0,0]]
];
var currentTetromino = new Tetromino(0,0,shapes[Math.trunc(Math.random() * shapes.length - 1)],colorData[Math.trunc(Math.random() * colorData.length - 1)]);
var nextTetromino = new Tetromino(0,0,shapes[Math.trunc(Math.random() * shapes.length - 1)],colorData[Math.trunc(Math.random() * colorData.length - 1)]);
var nextShape = JSON.parse(JSON.stringify(nextTetromino));

function drawNextShape(){
    nextShapeCanvas.clearRect(0,0,1000,1000);
for(var i = 0; i < nextShape.shape.length; i++){
    for(var j = 0; j < nextShape.shape.length; j++){
        if(nextShape.shape[i][j] == 1){
            nextShapeCanvas.drawImage(img, nextShape.color.x, nextShape.color.y, 24, 24, 50 + 28 * j + 4, 50 + 28 * i + 4, 24, 24);
        }
    }
}
}
/*
    drawImage():
    img	Specifies the image, canvas, or video element to use	 
    sx	Optional. The x coordinate where to start clipping	
    sy	Optional. The y coordinate where to start clipping	
    swidth	Optional. The width of the clipped image	
    sheight	Optional. The height of the clipped image	
    x	The x coordinate where to place the image on the canvas	
    y	The y coordinate where to place the image on the canvas	
    width	Optional. The width of the image to use (stretch or reduce the image)
    height	Optional. The height of the image to use (stretch or reduce the image)
*/
function resetGameboard(){
    for(var l = 0; l < gameboard.length; l++){
        for(var m = 0; m < gameboard[l].length; m++){
            gameboard[l][m] = 0;
        }
    }
}

function checkRow(){
    for(var l = gameboard.length - 1; l > 0; l--){
        for(var m = 0; m < gameboard[l].length; m++){
            if(gameboard[l].every(function(value){
                return (value["type"] == 1);
            })){
                return {
                    isRowComplete: true,
                    row: l
                };
            }
            else{
                break;
            }
        }
    }
    return {
        isRowComplete: false,
        row: null
    };
}

function shiftCol(arr, col) {
    var prev = arr[arr.length - 1][col-1];
    arr.forEach(function(v) {
      var t = v[col - 1];
      v[col - 1] = prev;
      prev = t;
    })
    return arr;
  }

function deleteRow(){
    if(checkRow()["isRowComplete"]){
        var row = checkRow()["row"];
        if(row == gameboard.length - 1){
            for(var i = 0; i < gameboard[row].length; i++){
                shiftCol(gameboard, i);
            }
            for(var j = 0; j < gameboard[row].length; j++){
                gameboard[0][j] = {"color": null, "type": 0}; 
            }
            return;
        }
        var tmpGameboard1 = gameboard.slice(0, row);
        var tmpGameboard2 = gameboard.slice(row, gameboard.length);
        //shifting all rows from 0 to l-1:
        for(var i = 0; i < tmpGameboard1[0].length; i++){
            shiftCol(tmpGameboard1, i);
        }
        for(var n = 0; n < gameboard[0].length; n++){
            gameboard[0][n] = {"color": null, "type": 0};     //replacing first row with default row
            tmpGameboard1[0][n] = {"color": null, "type": 0};
        }

        for(var k = 0; k  < gameboard.length; k++){
            if(k >= 0 && k < row){
                gameboard[k] = tmpGameboard1[k];
            }
            else{
                gameboard[k] = tmpGameboard2[k];
            }
        }
        console.log(gameboard)
    }
    else{
    }

}
function drawShapes(){
    for(var i = 0; i < currentTetromino.shape.length; i++){
        for(var j = 0; j < currentTetromino.shape.length; j++){
            if(currentTetromino.shape[i][j] == 1){
                canvas.drawImage(img, currentTetromino.color.x, currentTetromino.color.y, 24, 24, currentTetromino.position.x + 28 * j + 4, currentTetromino.position.y + 28 * i + 4, 24, 24);
            }
            else{}
        }
    }
}

function drawGameboard(){
    for(var i = 0; i < gameboard.length; i++){
        for(var j = 0; j < gameboard[i].length; j++){
            if(gameboard[i][j]["type"] == 1){
                canvas.drawImage(img, gameboard[i][j]["color"].x, gameboard[i][j]["color"].y, 24, 24, 28 * j + 4, 28 * i + 4, 24, 24);
            }
            else{

            }
        }
    }
}

function checkRemainingTetrominos(piece){
    for(var i = 0; i < piece.shape.length; i++){
        for(var j = 0; j < piece.shape.length; j++){
            if(piece.shape[i][j] == 1){
                if(gameboard[Math.trunc((piece.tmpPoint.y + 28 * i + 4) / 28)][Math.trunc((piece.tmpPoint.x + 28 * j + 4) / 28)]["type"] == 1){
                    for(var i = 0; i < piece.shape.length; i++){
                        for(var j = 0; j < piece.shape.length; j++){
                            if(piece.shape[i][j] == 1){
                            gameboard[Math.trunc((currentTetromino.position.y + 28 * i + 4) / 28)][Math.trunc((currentTetromino.position.x + 28 * j + 4) / 28)] = {"type": 1, "color": piece.color};
                            }
                        }
                    }
                    currentTetromino = nextTetromino;
                    nextTetromino = new Tetromino(0,0,shapes[Math.trunc(Math.random() * shapes.length - 1)],colorData[Math.trunc(Math.random() * colorData.length - 1)]);
                    nextShape = JSON.parse(JSON.stringify(nextTetromino));
                    updateScore(scoreNumber += 20);
                    return false;
                }
                else{
                }
            }
        }
    }
    return true;
}

function checkLeft(piece){
    for(var i = 0; i < piece.shape.length; i++){
        for(var j = 0; j < piece.shape.length; j++){
            if(piece.shape[i][j] == 1){
                if (((piece.position.x + 28 * j + 4) > 4)){
                }
                else{
                    return false;
                }
            }
        }
    }
    return true;
}

function checkRight(piece){
    for(var i = 0; i < piece.shape.length; i++){
        for(var j = 0; j < piece.shape.length; j++){
            if(piece.shape[i][j] == 1){
                if(((piece.position.x + 28 * j + 4) < 256)){
                }
                else{
                    return false;
                }
            }
        }
    }
    return true;
}

function checkBottom(piece){
    for(var i = 0; i < piece.shape.length; i++){
        for(var j = 0; j < piece.shape.length; j++){
            if(piece.shape[i][j] == 1){
                if(((piece.position.y + 28 * i + 4) < 564)){
                }
                else{
                    for(var i = 0; i < piece.shape.length; i++){
                        for(var j = 0; j < piece.shape.length; j++){
                            if(piece.shape[i][j] == 1){
                                gameboard[Math.trunc((currentTetromino.position.y + 28 * i + 4) / 28)][Math.trunc((currentTetromino.position.x + 28 * j + 4) / 28)] = {"type": 1, "color": piece.color};
                        }
                        }
                    }
                    currentTetromino = nextTetromino;
                    nextTetromino = new Tetromino(0,0,shapes[Math.trunc(Math.random() * shapes.length - 1)],colorData[Math.trunc(Math.random() * colorData.length - 1)]);
                    nextShape = JSON.parse(JSON.stringify(nextTetromino));
                    updateScore(scoreNumber += 20);
                    return false;
                }
            }
        }
    }
    return true;
}

function gameLoop(){
    canvas.clearRect(0, 0, 1000, 1000);
    setUpGameBoard();
    drawShapes();
    deleteRow();
    drawGameboard();
    drawNextShape();
    currentTetromino.moveDown();
    if(checkBottom(currentTetromino) && checkRemainingTetrominos(currentTetromino)){
        currentTetromino.update();
    }
    }
setInterval(gameLoop,400);


document.addEventListener("keydown", function(e) {
    switch (e.which) {
        case 38:
            console.log("up");
            if(checkBottom(currentTetromino) && checkLeft(currentTetromino) && checkRight(currentTetromino)){
                currentTetromino.rotate();
            }
            break;
        case 40:
            console.log("down");
            updateScore(scoreNumber += 10);
            currentTetromino.moveDown();
            if(checkBottom(currentTetromino) && checkRemainingTetrominos(currentTetromino)){
                currentTetromino.update();
                }
            break;
        case 37:
            console.log("left");
            currentTetromino.moveLeft();
            if(checkLeft(currentTetromino) && checkBottom(currentTetromino)){
                currentTetromino.update();
                }
            break;
        case 39:
            console.log("right");
            currentTetromino.moveRight();
            if(checkRight(currentTetromino) && checkBottom(currentTetromino)){
                currentTetromino.update();
                }
            break;
    }
});