var ctx = document.getElementById("myCanvas");
var canvas = ctx.getContext("2d");

const snakeBodyX = [];
const snakeBodyY = [];
var counter = 100;
var bodyParts = 1;
var score = 0;
var food = {
    x: 500,
    y: 500
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const Direction = {
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right'
  };

  var currentDirection;
  function setupPlayerPosition(x,y){
      snakeBodyX[0] = x;
      snakeBodyY[0] = y;
  }

    setupPlayerPosition(50,50);
    window.requestAnimationFrame(gameLoop);

  function detectCollisionForOwnPlayer() {
    for(var i = bodyParts; i > 0; i--) {
        if(snakeBodyX[0] == snakeBodyX[i] && snakeBodyY[0] == snakeBodyY[i]) {
            return true;
        }
        if(snakeBodyX[0] < 0) {
            return true;
        }
        if(snakeBodyX[0] > 700){
            return true;
        }
        if(snakeBodyY[0]<0) {
            return true;
        }
        if(snakeBodyY[0] > 700) {
            return true;
        }
    }
}
function detectCollisionWithFood(){
var xDif = snakeBodyX[0] - food.x;
var yDif = snakeBodyY[0] - food.y;
var distanceSquared = xDif * xDif + yDif * yDif;
return distanceSquared < (30 + 30) * (30 + 30);
}

function draw(){
    canvas.fillStyle = "red";
    canvas.fillRect(food.x,food.y,40,40);
    for(var i = 0; i<bodyParts; i++) {
        
        if(i == 0) {
            canvas.fillStyle = "yellow";
            canvas.fillRect(snakeBodyX[i], snakeBodyY[i], 40, 40);
        }
        else {
            canvas.fillStyle = "green";
            canvas.fillRect(snakeBodyX[i], snakeBodyY[i], 40, 40);
        }
    }
    for (var j = bodyParts; j>0 ; j--) {
        snakeBodyX[j]  = snakeBodyX[j-1];
        snakeBodyY[j]  = snakeBodyY[j-1];
    }
    
    switch(currentDirection) {
		case Direction.Up:
        snakeBodyY[0] = snakeBodyY[0] - 10;
			break;
		case Direction.Down: 
        snakeBodyY[0] = snakeBodyY[0] + 10;
			break;
		case Direction.Left: 
        snakeBodyX[0] = snakeBodyX[0] - 10;
			break;
		case Direction.Right: 
        snakeBodyX[0] = snakeBodyX[0] + 10;
			break;		
		}
}

function updateScore(){
    var scoreText = document.getElementById("scoreText");
    score++;
    scoreText.innerHTML = "Score: " + score;
}

function gameLoop() {
    if(detectCollisionWithFood()){
        food.x = getRandomInt(780);
        food.y = getRandomInt(780);
        bodyParts++;
        updateScore();

    }
    canvas.clearRect(0, 0, 1000, 1000);
    draw();
    window.requestAnimationFrame(gameLoop);
}


document.addEventListener("keydown", function(e) {
    switch (e.which) {
        case 38:
            if(currentDirection != Direction.Down)
            currentDirection = Direction.Up;
            break;
        case 40:
            if(currentDirection != Direction.Up)
            currentDirection = Direction.Down;
            break;
        case 37:
            if(currentDirection != Direction.Right)
            currentDirection = Direction.Left;
            break;
        case 39:
            if(currentDirection != Direction.Left)
            currentDirection = Direction.Right;
            break;
    }
});