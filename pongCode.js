var ctx = document.getElementById("myCanvas");
var canvas = ctx.getContext("2d");

var ball = {
    x: 500,
    y: 300
}

window.requestAnimationFrame(gameLoop);

function gameLoop(){
    draw();
    window.requestAnimationFrame(gameLoop);
}