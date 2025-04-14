var ctx = document.getElementById("myCanvas");
var canvas = ctx.getContext("2d");

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class Particle{
    constructor(isAlive, x, y){
        this.isAlive = isAlive;
        this.x = x;
        this.y = y;
    }
}

class Enemy{
    constructor(isAlive, x, y){
        this.isAlive = isAlive;
        this.x = x;
        this.y = y;
    }
}

const Direction = {
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right'
  };

  var playerPosition = {
    x: 100,
    y: 650
  };
  var scoreText = document.getElementById("scoreText");
  var scoreNumber = 0;
  var gameStarted = true;
  var particles = [];
  var enemies = [];
  var tmpP = new Point(100,100);
  var enemyParticles = [new Particle(true,tmpP.x,tmpP.y)];
  var currentDirection;
var spaceShipImage = document.getElementById("spaceship");
var enemyImage = document.getElementById("enemy");

var sources = {
    spaceship: "spaceship.png",
    enemy: "enemy.png"
}


function initEnemies() {
    for(var i = 0; i < 7; i++) {
        for(var j = 0; j<3; j++) {
        enemies.push(new Enemy(true,70+100*i,50+100*j));
        }
    }
}

function moveParticlesOnUp(){
    for(var i = 0; i < particles.length; i++){
        if(particles[i].isAlive){
        particles[i].y -= 5;
        }
        else {
            particles.splice(i,1);
        }
    }

    for(var j = 0; j < enemyParticles.length; j++){
        if(enemyParticles[j].isAlive){
            enemyParticles[j].y += 5;
        }
        else{
            enemyParticles.splice(j,1);
        }
    }
}
function draw(){
        for(var j = 0; j < enemies.length; j++) {
                if(enemies[j].isAlive) {
                    canvas.drawImage(enemyImage,enemies[j].x,enemies[j].y,50,50);
                    }
                }
    canvas.fillStyle = "blue";
    for(var i = 0; i < particles.length; i++){
        canvas.fillRect(particles[i].x+20,particles[i].y+10,15,15);
    }
    canvas.fillStyle = "red";
    for(var l = 0; l < enemyParticles.length; l++) {
        canvas.fillRect(enemyParticles[l].x,enemyParticles[l].y,15,15);
    }
}

//window.requestAnimationFrame(gameLoop);

function gameLoop(){
    canvas.clearRect(0, 0, 1000, 1000);
    canvas.drawImage(spaceShipImage,playerPosition.x,playerPosition.y,50,50);

    for(var p of particles) {
        for(var e of enemies) {
            if(e.isAlive) {
            var xDif = e.x - p.x;
            var yDif = e.y - p.y;
            var distanceSquared = xDif * xDif + yDif * yDif;
            var collision = distanceSquared < (20 + 20) * (20 + 20);
            if(collision) {
                e.isAlive = false;
                p.isAlive = false;
                scoreNumber += 10;
                scoreText.innerHTML = "Score: " + scoreNumber;
            }
            }
        }
    }
    if (gameStarted && enemyParticles[0].y > 800){
        enemyParticles.splice(0,enemyParticles.length);
        var enem = enemies[parseInt(Math.random()*enemies.length)];
        tmpP = new Point(enem.x, enem.y);
        enemyParticles.push(new Particle(true,tmpP.x, tmpP.y));
    }


	for(var p2 of enemyParticles) {
        console.log(enemyParticles)
		var xDif = p2.x - playerPosition.x;
		var yDif = p2.y - playerPosition.y;
		var distanceSquared = xDif * xDif + yDif * yDif;
		var collision = distanceSquared < (15 + 15) * (15 + 15);
		if (collision) {
            scoreNumber -= .5;
            scoreText.innerHTML = "Score: " + scoreNumber;	
            break;
        }
	}
    moveParticlesOnUp();
    draw();
    //window.requestAnimationFrame(gameLoop);
}
initEnemies();
setInterval(gameLoop,10);


document.addEventListener("keydown", function(e) {
    switch (e.which) {
        case 38:
            currentDirection = Direction.Up;
            particles.push(new Particle(true,playerPosition.x,playerPosition.y));
            break;
        case 37:
            currentDirection = Direction.Left;
            playerPosition.x -= 10;
            break;
        case 39:
            currentDirection = Direction.Right;
            playerPosition.x += 10;
            break;
    }
});