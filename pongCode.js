var ctx = document.getElementById("myCanvas");
var canvas = ctx.getContext("2d");
var scoreText = document.getElementById("scoreText");
var ball = {
    x: 500,
    y: 300, 
    xVel: 5,
    yVel: 5
}

var playerTwo = {
    x:  900,
    y: 200
}

var playerOne = {
    x: 50,
    y: 200
}
const Direction = {
    Up: 'Up',
    Down: 'Down'
  };
function setVel(x,y){
    ball.xVel = x;
    ball.yVel = y;
}
  
var currentDirection;

function ballUpdate(){
    ball.x += ball.xVel;
    ball.y += ball.yVel;
}
var scoreP1 = 0;
function checkForPoints(){
    if(ball.x > 1000 || ball.x < 0 ) {
        if(ball.x > 1000 ) {
            scoreP1++; 
            scoreText.innerHTML = "Score: "+ scoreP1;
        }
        if(ball.x < 0 ) {
            scoreP1--;
            scoreText.innerHTML = "Score: "+ scoreP1;
        }
        ball.x = 500;
        ball.y = 300;
}
}
function detectCollision(){
    if(ball.y > 540) {
        setVel(ball.xVel, -ball.yVel);
    }
    if(ball.y < 10) {
        setVel(ball.xVel, -ball.yVel);
    }
    if((ball.y>= playerOne.y) && (ball.y<= playerOne.y+100) &&(ball.x>=playerOne.x &&ball.x<=playerOne.x+10 )) {
        setVel(-ball.xVel, ball.yVel);
    }
    if((ball.y>= playerOne.y+100) && (ball.y<= playerOne.y+200) &&(ball.x>=playerOne.x &&ball.x<=playerOne.x+10 )) {
        setVel(-ball.xVel, ball.yVel);
    }
    if((ball.y>= playerTwo.y) && (ball.y<= playerTwo.y+100) &&(ball.x>=playerTwo.x &&ball.x<=playerTwo.x+10 )) {
        setVel(-ball.xVel, ball.yVel);
    }
    if((ball.y>= playerTwo.y+100) && (ball.y<= playerTwo.y+200) &&(ball.x>=playerTwo.x &&ball.x<=playerTwo.x+10 )) {
        setVel(-ball.xVel, ball.yVel);
    }
    
}
window.requestAnimationFrame(gameLoop);

function draw(){

    canvas.fillStyle = "red";
    canvas.beginPath();
    canvas.arc(ball.x-10, ball.y-10, 20, 0,2 * Math.PI);
    canvas.stroke();
    canvas.fill();
    canvas.fillStyle = "black";
	canvas.fillRect(playerOne.x, playerOne.y, 20, 200);
	canvas.fillRect(playerTwo.x, playerTwo.y, 20, 200);
}
function gameLoop(){
    canvas.clearRect(0, 0, 1000, 1000);
    ballUpdate();
    detectCollision();
    checkForPoints();
    draw();
    window.requestAnimationFrame(gameLoop);
}


document.addEventListener("keydown", function(e) {
    switch (e.which) {
        case 38:
            currentDirection = Direction.Up;
            playerOne.y -= 10;
            break;
        case 40:
            currentDirection = Direction.Down;
            playerOne.y += 10;
            break;
            }
});