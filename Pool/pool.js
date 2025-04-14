const ctx = document.getElementById("myCanvas");
const canvas = ctx.getContext("2d");
const statusText = document.getElementById("winner-display");

const WIDTH = 1400;
const HEIGHT = 800;
const MIN_SPEED = 5;

const boardX = 280;
const boardY = 170;
const boardWidth = 840;
const boardHeight = 445;
const vectorLength = 50;
const arrowSize = 10;
const ballRadius = 10;

let isDebugMode = false;
let elapsedTime;
let mousePosition = {x: 0, y: 0};
let isFirstBall = true;
let isFirstTurn = true;
let isTurnOver = false;
let isGameOver = false;
let achievedBalls = [];

const BALL_TYPE = {
    Striped: 'Striped',
    Filled: 'Filled'
};

const playerType = {
    Player1: 'Player1',
    Player2: 'Player2',
    Computer: 'Computer'
};

const gameStatus = {
    running: 'running',
    gameOver: 'gameOver',
    paused: 'paused'
};

const game = {
    status: gameStatus.running,
    activePlayer: null,
    passivePlayer: null,
    player1: null,
    player2: null
};

const player1 = {
    score: 0,
    ballType: null,
    htmlElement: null,
    balls: [],
    playerType: playerType.Player1
};
const player2 = {
    score: 0,
    ballType: null,
    htmlElement: null,
    balls: [],
    playerType: playerType.Player2
};

let friction = 0.15;
let totalDistance = 0;
let lastTime = 0;

const BALLS = [
    {color: "white", number: 0, type: BALL_TYPE.Filled},
    {color: "yellow", number: 1, type: BALL_TYPE.Filled},
    {color: "blue", number: 2, type: BALL_TYPE.Filled},
    {color: "red", number: 3, type: BALL_TYPE.Filled},
    {color: "purple", number: 4, type: BALL_TYPE.Filled},
    {color: "orange", number: 5, type: BALL_TYPE.Filled},
    {color: "green", number: 6, type: BALL_TYPE.Filled},
    {color: "maroon", number: 7, type: BALL_TYPE.Filled},
    {color: "black", number: 8, type: BALL_TYPE.Filled},
    {color: "yellow", number: 9, type: BALL_TYPE.Striped},
    {color: "blue", number: 10, type: BALL_TYPE.Striped},
    {color: "red", number: 11, type: BALL_TYPE.Striped},
    {color: "purple", number: 12, type: BALL_TYPE.Striped},
    {color: "orange", number: 13, type: BALL_TYPE.Striped},
    {color: "green", number: 14, type: BALL_TYPE.Striped},
    {color: "maroon", number: 15, type: BALL_TYPE.Striped}
];

const holeCoordinates = [
    {name: "Hole1", x: 250, y: 160, radius: 40},
    {name: "Hole2", x: 700, y: 160, radius: 40},
    {name: "Hole3", x: 1150, y: 160, radius: 40},
    {name: "Hole4", x: 250, y: 630, radius: 40},
    {name: "Hole5", x: 700, y: 630, radius: 40},
    {name: "Hole6", x: 1150, y: 630, radius: 40}
];

let ball = {
    x: 500,    
    y: 400,    
    xVel: 0,   
    yVel: 0,
    radius: ballRadius,
    timesBounced: 0,
    isMoving: false,
    distance: 0,
    isVisible: true
};

const poolBoardImage = document.getElementById("poolboard");
// dimensions: 2000 × 1150
const poolBoard = {
    image: poolBoardImage,
    x: 150,
    y: 50
};

let balls = [];

function setupMap(){
  let startX = 800;
  let startY = 400;
  let rows = 5;
  
  let ballPositions = generatePoolBallPositions(startX, startY, ballRadius, rows);
  ballPositions = rotatePositionsBy90Degrees(ballPositions, startX, startY);
  balls.push(ball);
  balls.push(...ballPositions);
  for(let i = 0; i < balls.length; i++){
    balls[i].number = BALLS[i].number;
    balls[i].type = BALLS[i].type;
    balls[i].color = BALLS[i].color;
    balls[i].isMoving = false;
    balls[i].isVisible = true;
  }
}

function pushBall(){
    if(isFirstTurn || isTurnOver){
        ball.xVel = (ball.x - mousePosition.x) * 3;
        ball.yVel = (ball.y - mousePosition.y) * 3;
        ball.isMoving = true;
    }
}

function drawFilledBall(x, y, radius, color, number){
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, 2 * Math.PI);
    canvas.fillStyle = color;
    canvas.fill();
    canvas.closePath();

    canvas.beginPath();
    canvas.arc(x, y, radius / 2, 0, Math.PI * 2);
    canvas.fillStyle = "white";
    canvas.fill();
    canvas.closePath();

    if(number != 0){
        canvas.fillStyle = "black";
        canvas.font = `${radius}px Arial`;
        canvas.textAlign = "center";
        canvas.textBaseline = "middle";
        canvas.fillText(number, x, y);
    }
}

function drawLine(start, end, color){
    canvas.beginPath();
    canvas.moveTo(start.x, start.y);
    canvas.lineTo(end.x, end.y);
    canvas.strokeStyle = color;
    canvas.lineWidth = 2;
    canvas.stroke();
}

function drawArrowHead(x, y, vx, vy, color) {
    const endX = x + vx;
    const endY = y + vy;
    const angle = Math.atan2(vy, vx);
    canvas.beginPath();
    canvas.moveTo(endX, endY);
    canvas.lineTo(
      endX - arrowSize * Math.cos(angle - Math.PI / 6),
      endY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    canvas.moveTo(endX, endY);
    canvas.lineTo(
      endX - arrowSize * Math.cos(angle + Math.PI / 6),
      endY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
  
    canvas.strokeStyle = color;
    canvas.lineWidth = 2;
    canvas.stroke();
}

function drawStripedBall(x, y, radius, stripeColor, number) {
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, Math.PI * 2);
    canvas.fillStyle = "white";
    canvas.fill();
    canvas.closePath();
  
    const stripeHeight = radius / 1.25;
    canvas.fillStyle = stripeColor;
    canvas.fillRect(x - radius, y - stripeHeight / 2, radius * 2, stripeHeight);

    canvas.beginPath();
    canvas.arc(x, y, radius/2, 0, Math.PI * 2);
    canvas.fillStyle = "white";
    canvas.fill();
    canvas.closePath();

    if (number) {
        canvas.fillStyle = "black";
        canvas.font = `${radius}px Arial`;
        canvas.textAlign = "center";
        canvas.textBaseline = "middle";
        canvas.fillText(number, x, y);
      }
  }

function generatePoolBallPositions(startX, startY, ballRadius, rows, spacing = 5) {
    const positions = [];
    const effectiveRadius = ballRadius + spacing;

    for (let row = 0; row < rows; row++) {
        let y = startY + row * effectiveRadius * Math.sqrt(3);

        let ballsInRow = row + 1;

        let rowStartX = startX - (ballsInRow - 1) * effectiveRadius;

        for (let col = 0; col < ballsInRow; col++) {
            let x = rowStartX + col * 2 * effectiveRadius;
            positions.push({ x: x, y: y, xVel: 0, yVel: 0, radius: ballRadius, timesBounced: 0, isMoving: false, distance: 0 });
        }
    }
    return positions;
}

function rotatePositionsBy90Degrees(positions, centerX, centerY) {
    return positions.map(ball => {
        let translatedX = ball.x - centerX;
        let translatedY = ball.y - centerY;

        let rotatedX = translatedY;
        let rotatedY = -translatedX;

        return {
            ...ball,
            x: rotatedX + centerX,
            y: rotatedY + centerY
        };
    });
}
  
function detectCircleCollision(circle1, circle2) {
    if(circle1 && circle2){
        let dx = circle2.x - circle1.x;
        let dy = circle2.y - circle1.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
      
        return distance < circle1.radius + circle2.radius;
    }
    return false;
}

function calculateCollision(ball1, ball2) {
    let dx = ball2.x - ball1.x;
    let dy = ball2.y - ball1.y;
    let angleLine = Math.atan2(dy, dx);
  
    let v1n = (ball1.xVel * Math.cos(angleLine) + ball1.yVel * Math.sin(angleLine));
    let v2n = (ball2.xVel * Math.cos(angleLine) + ball2.yVel * Math.sin(angleLine));
    
    let v1t = -(ball1.xVel * Math.sin(angleLine) - ball1.yVel * Math.cos(angleLine));
    let v2t = -(ball2.xVel * Math.sin(angleLine) - ball2.yVel * Math.cos(angleLine));
  
    let v1nNew = v2n;
    let v2nNew = v1n;
  
    let ball1vxNew = v1nNew * Math.cos(angleLine) - v1t * Math.sin(angleLine);
    let ball1vyNew = v1nNew * Math.sin(angleLine) + v1t * Math.cos(angleLine);
    
    let ball2vxNew = v2nNew * Math.cos(angleLine) - v2t * Math.sin(angleLine);
    let ball2vyNew = v2nNew * Math.sin(angleLine) + v2t * Math.cos(angleLine);
  
    ball1.xVel = ball1vxNew;
    ball1.yVel = ball1vyNew;
    ball2.xVel = ball2vxNew;
    ball2.yVel = ball2vyNew;
  
    return { ball1, ball2 };
}

function angleToVector(angleDegrees) {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const x = Math.cos(angleRadians); 
    const y = Math.sin(angleRadians); 
    return { x, y }; 
}

function updateScore(ball) {
    let element = document.getElementById('p1-container');
    let element2 = document.getElementById('p2-container');
    let index = 1;
    let index2 = 0;

    if(isFirstBall){
        if(ball.type == BALL_TYPE.Filled){
            game.activePlayer.ballType = BALL_TYPE.Filled;
            game.passivePlayer.ballType = BALL_TYPE.Striped;
        }
        if(ball.type == BALL_TYPE.Striped){
            game.activePlayer.ballType = BALL_TYPE.Striped;
            game.passivePlayer.ballType = BALL_TYPE.Filled;
        }
        isFirstBall = false;
    }

    if(isFirstTurn){
        isFirstTurn = false;
    }

    while(element.children[index].classList.contains("filled")){
        index++;
    }
    while(element2.children[index2].classList.contains("striped")){
        index2++;
    }
    if(game.activePlayer == player1){
        element = document.getElementById('p1-container');
    }
    else if(game.passivePlayer == player2){
        element2 = document.getElementById('p2-container');
    }
    if(ball.type == BALL_TYPE.Filled){
        const htmlElement = document.createElement("div");
        htmlElement.classList.add("filled-icon");
        element.children[index].classList.add("filled");
        element.children[index].style = "background-color: " + ball.color + ";";
        htmlElement.innerHTML = ball.number;
        element.children[index].append(htmlElement);
    }
    if(ball.type == BALL_TYPE.Striped){
        const htmlElement = document.createElement("div");
        htmlElement.classList.add("striped-item");
        const subElement = document.createElement("div");
        subElement.classList.add("striped-icon");
        htmlElement.append(subElement);
        element2.children[index2].classList.add("striped");
        htmlElement.style = "background-color: " + ball.color + ";";
        subElement.innerHTML = ball.number;
        element2.children[index2].append(htmlElement);
    }
}
  
function updateBalls(currentTime){
    if(isTurnOver) {
        
    }

    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    for (let i = 0; i < balls.length; i++){
        if(balls[i].isMoving){

            for (let j = 0; j < holeCoordinates.length; j++) {
                if(detectCircleCollision(balls[i], holeCoordinates[j])){
                    if(balls[i].number%2 == 0){
                        isGameOver = true;
                        statusText.innerHTML = "Winner: <b style='color: red;'>Game Over!</b>";
                    }
                    if(game.activePlayer.isEven){
                        if(balls[i].number%2 == 0){
                            game.activePlayer.balls.push(balls[i]);
                        }
                        else if(balls[i].number%2 != 0){
                            game.passivePlayer.balls.push(balls[i]);
                        }
                    }
                    if(!game.activePlayer.isEven){
                        if(balls[i].number%2 == 0){
                            game.passivePlayer.balls.push(balls[i]);
                        }
                        else if(balls[i].number%2 != 0){
                            game.activePlayer.balls.push(balls[i]);
                        }
                    }
                    if(game.activePlayer.isEven == null){
                        game.activePlayer.isEven = balls[i].number%2 == 0;
                        game.activePlayer.balls.push(balls[i]);
                    }
                    balls[i].isVisible = false;
                    balls[i].isMoving = false;
                    updateScore(balls[i]);
                    achievedBalls.push(balls[i]);
                }
            }

            const deltaX = balls[i].xVel * deltaTime;
            const deltaY = balls[i].yVel * deltaTime;
            balls[i].x += deltaX;
            balls[i].y += deltaY;
            totalDistance += Math.sqrt(deltaX ** 2 + deltaY ** 2);
            balls[i].xVel *= 1 - friction * deltaTime;
            balls[i].yVel *= 1 - friction * deltaTime;
            balls[i].distance = totalDistance;

            if((Math.abs(balls[i].xVel) < MIN_SPEED && Math.abs(balls[i].yVel) < MIN_SPEED) && (balls[i].xVel != 0 || balls[i].yVel != 0)){
                balls[i].isMoving = false;
            }

            if(balls[i].type == BALL_TYPE.Filled){
                drawFilledBall(balls[i].x, balls[i].y, balls[i].radius, balls[i].color, balls[i].number);
            }
            else if(balls[i].type == BALL_TYPE.Striped){
                drawStripedBall(balls[i].x, balls[i].y, balls[i].radius, balls[i].color, balls[i].number);
            }
            const magnitude = Math.sqrt(balls[i].xVel ** 2 + balls[i].yVel ** 2);
            const unitVx = balls[i].xVel / magnitude;
            const unitVy = balls[i].yVel / magnitude;
            const scaledVx = unitVx * vectorLength;
            const scaledVy = unitVy * vectorLength;

            if(isDebugMode){
                drawLine({x: balls[i].x, y: balls[i].y}, {x: balls[i].x + scaledVx, y: balls[i].y + scaledVy}, "red");
                drawArrowHead(balls[i].x, balls[i].y, scaledVx, scaledVy, "red");
            }
            if(balls[i].y < boardY){
                balls[i].yVel = - balls[i].yVel; 
                balls[i].timesBounced++;
            }
            else if(balls[i].x >= (boardX + boardWidth)){
                balls[i].xVel = - balls[i].xVel; 
                balls[i].timesBounced++;
            }
            else if(balls[i].y >= (boardY + boardHeight)){
                balls[i].yVel = - balls[i].yVel; 
                balls[i].timesBounced++;
            }
            else if(balls[i].x < boardX){
                balls[i].xVel = - balls[i].xVel; 
                balls[i].timesBounced++;
            }
        }
        else if(!balls[i].isMoving){
            if(balls[i].isVisible){
                if(balls[i].type == BALL_TYPE.Filled){
                    drawFilledBall(balls[i].x, balls[i].y, balls[i].radius, balls[i].color, balls[i].number);
                }
                else if(balls[i].type == BALL_TYPE.Striped){
                    drawStripedBall(balls[i].x, balls[i].y, balls[i].radius, balls[i].color, balls[i].number);
                }
            }
            else {
                isTurnOver = true;
            }
        }
        for (let j = i + 1; j < balls.length; j++) {
            if(detectCircleCollision(balls[i], balls[j]) && balls[j].isVisible && balls[i].isVisible){
                calculateCollision(balls[i], balls[j]);
                balls[i].isMoving = true;
                balls[j].isMoving = true;
            }
        }
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return {x, y};
}

ctx.addEventListener('mousedown', function(e) {
    getCursorPosition(ctx, e);
});

ctx.addEventListener('mousemove', function(e) {
    mousePosition = getCursorPosition(ctx, e);
});

ctx.addEventListener('click', () => {
    pushBall();
});

document.addEventListener("keydown", function(e) {
    switch (e.which) {
        case 38:
            console.log("up");
            break;
        case 40:
            console.log("down");
            break;
        case 37:
            console.log("left");
            break;
        case 39:
            console.log("right");
            break;
        case 32:
            console.log("space");
            break;
        case 68:
            isDebugMode = !isDebugMode;
            break;
    }
});

function setActivePlayerText(player) {
    const element = document.getElementById("turn-display");
    if(player.playerType == playerType.Player1) {
        element.innerHTML = "Turn: <b style='color: blue;'>Player 1</b>";
    }
    else if(player.playerType == playerType.Player2) {
        element.innerHTML = "Turn: <b style='color: green;'>Player 2</b>";
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    game.player1 = player1;
    game.player2 = player2;
    game.status = gameStatus.running;
    game.activePlayer = player1;
    game.passivePlayer = player2;
    player1.htmlElement = document.getElementById('player1-name');
    player2.htmlElement = document.getElementById('player2-name');
    player1.htmlElement.classList.add('active-1');
    setActivePlayerText(game.player1);
    setupMap();
});

function drawPlayerLine(color) {
    drawLine({x: mousePosition.x + 5, y: mousePosition.y}, {x: ball.x, y: ball.y}, color);
    const xVel = (ball.x - mousePosition.x) * 3;
    const yVel = (ball.y - mousePosition.y) * 3;
    
    const magnitude = Math.sqrt(xVel ** 2 + yVel ** 2);
    const unitVx = xVel / magnitude;
    const unitVy = yVel / magnitude;
    const scaledVx = unitVx * vectorLength;
    const scaledVy = unitVy * vectorLength;
    drawLine({x: ball.x, y: ball.y}, {x: ball.x + scaledVx, y: ball.y + scaledVy}, color);

    if(game.activePlayer == player1){
        drawArrowHead(ball.x, ball.y, scaledVx, scaledVy, "blue");
    }
    else if(game.activePlayer == player2){
        drawArrowHead(ball.x, ball.y, scaledVx, scaledVy, "red");
    }
}

function gameLoop(currentTime){
    elapsedTime = currentTime;
    canvas.clearRect(0, 0, WIDTH, HEIGHT);
    canvas.drawImage(poolBoard.image, poolBoard.x, poolBoard.y, 1100, 690);
    updateBalls(currentTime);
    if(game.activePlayer == player1){
        drawPlayerLine("blue");
    }
    else if(game.activePlayer == player2){
        drawPlayerLine("red");
    }
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);