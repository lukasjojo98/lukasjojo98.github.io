var ctx = document.getElementById("myCanvas");
var canvas = ctx.getContext("2d");

var player = {x:200,y:200}
var img = document.getElementById("image");

function setUpGameBoard(){
    canvas.fillStyle = "white";
    for(var i = 0; i < 11; i++){
        canvas.fillRect(28 * i,0,5,700);
    }
    for(var j = 0; j < 22; j++){
        canvas.fillRect(0,28 * j,700,5);
    }
    
}
function gameLoop(){
setUpGameBoard();
canvas.drawImage(img,0,0,24,24,4,player.y,24,24);
canvas.drawImage(img,0,0,24,24,32,player.y,24,24);
}
setInterval(gameLoop,50);


document.addEventListener("keydown", function(e) {
    switch (e.which) {
        case 38:
            console.log("up");
            break;
        case 40:
            console.log("down");
            player.y += 28;
            break;
        case 37:
            console.log("left");
            break;
        case 39:
            console.log("right");
            break;
    }
});