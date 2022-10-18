var ctx = document.getElementById("myCanvas");
var canvas = ctx.getContext("2d");
var tankImage = document.getElementById("tank");
var playerPosition = {x: 100, y: 100};
var bulletList = [];
window.requestAnimationFrame(gameLoop);

function setupMap(){
    canvas.beginPath();
    canvas.rect(100, 100, 800, 600);
    canvas.stroke();
}

function shootBullets(){
    bulletList.push({x: playerPosition.x + 90,y: playerPosition.y + 25, xVel: 1, yVel: -1, timesBounced: 0});
}

function updateBullets(){
    bulletList = bulletList.filter((element) => {
        return element.timesBounced < 4;
    });
    for (var i = 0; i < bulletList.length; i++){
        canvas.beginPath();
        canvas.arc(bulletList[i].x, bulletList[i].y, 8, 0,2 * Math.PI);
        canvas.stroke();
        canvas.fill();
        if(bulletList[i].y < 100){
            bulletList[i].yVel = - bulletList[i].yVel; 
            bulletList[i].timesBounced++;
        }
        else if(bulletList[i].x > 900){
            bulletList[i].xVel = - bulletList[i].xVel; 
            bulletList[i].timesBounced++;
        }
        else if(bulletList[i].y > 700){
            bulletList[i].yVel = - bulletList[i].yVel; 
            bulletList[i].timesBounced++;
        }
        else if(bulletList[i].x < 100){
            bulletList[i].xVel = - bulletList[i].xVel; 
            bulletList[i].timesBounced++;
        }
        bulletList[i].x += 5 * bulletList[i].xVel;
        bulletList[i].y += 5 * bulletList[i].yVel;
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
