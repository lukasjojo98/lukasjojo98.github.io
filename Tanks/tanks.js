var ctx = document.getElementById("myCanvas");
var canvas = ctx.getContext("2d");
var tankImage = document.getElementById("tank");
var playerPosition = {x: 100, y: 100};
var balls = [];
window.requestAnimationFrame(gameLoop);

function setupMap(){
    canvas.beginPath();
    canvas.rect(100, 100, 800, 600);
    canvas.stroke();
}

function shootBullets(){
    balls.push({x: playerPosition.x + 90,y: playerPosition.y + 25, xVel: 1, yVel: -1, timesBounced: 0});
}

function updateBullets(){
    balls = balls.filter((element) => {
        return element.timesBounced < 4;
    });
    for (var i = 0; i < balls.length; i++){
        canvas.beginPath();
        canvas.arc(balls[i].x, balls[i].y, 8, 0,2 * Math.PI);
        canvas.stroke();
        canvas.fill();
        if(balls[i].y < 100){
            balls[i].yVel = - balls[i].yVel; 
            balls[i].timesBounced++;
        }
        else if(balls[i].x > 900){
            balls[i].xVel = - balls[i].xVel; 
            balls[i].timesBounced++;
        }
        else if(balls[i].y > 700){
            balls[i].yVel = - balls[i].yVel; 
            balls[i].timesBounced++;
        }
        else if(balls[i].x < 100){
            balls[i].xVel = - balls[i].xVel; 
            balls[i].timesBounced++;
        }
        balls[i].x += 5 * balls[i].xVel;
        balls[i].y += 5 * balls[i].yVel;
    }
}

function gameLoop(){
    canvas.clearRect(0, 0, 1000, 1000);
    setupMap();
    updateBullets();
    canvas.drawImage(tankImage,0,0,512,512,playerPosition.x,playerPosition.y,100,100);
    window.requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(e) {
    switch (e.which) {
        case 38:
            console.log("up");
            if(playerPosition.y >= 100){
            playerPosition.y -= 30;
            }
            
            break;
        case 40:
            console.log("down");
            if(playerPosition.y <= 620){
            playerPosition.y += 30;
            }
            
            break;
        case 37:
            console.log("left");
            if(playerPosition.x >= 100){
            playerPosition.x -= 30;
            }
            
            break;
        case 39:
            console.log("right");
            if(playerPosition.x <= 800){
            playerPosition.x += 30;
            }
           
            break;
        case 32:
            console.log("space");
            shootBullets();
            break;
    }

});
