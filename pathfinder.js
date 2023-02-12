var ctx = document.getElementById("myCanvas");
var canvas = ctx.getContext("2d");


let drawBoard = function(){
    for(var i = 0; i < 11; i++){
        canvas.beginPath();
        canvas.moveTo(0,i * 50);
        canvas.lineTo(500,i * 50);
        canvas.stroke();
    }
    for(var i = 0; i < 11; i++){
        canvas.beginPath();
        canvas.moveTo(i * 50,0);
        canvas.lineTo(i * 50,500);
        canvas.stroke();
}
}
let state = {
    pickStart: false,
    pickGoal: false,
    pickObstacles: false
};
let start;
var gridSize = 10;
var grid = [];
for (var i=0; i<gridSize; i++) {
  grid[i] = [];
  for (var j=0; j<gridSize; j++) {
    grid[i][j] = 'Empty';
  }
}


function checkClick(color, type){
    for(var i = 0; i < 11; i++){
        for(var j = 0; j < 11; j++){
        if((event.offsetX >= (50 * i) &&  event.offsetX <= (50 * i + 50)) && ((event.offsetY >= (50 * j) &&  event.offsetY <= (50 * j + 50)))){
            canvas.fillStyle = color;
            canvas.fillRect(50 * i,50 * j,50,50);
            if(type === "Start"){
                start = [i,j];
                grid[i][j] = "Start";
            }
            else if(type === "Goal"){
                grid[i][j] = "Goal";
            }
            else if(type === "Obstacle"){
                grid[i][j] = "Obstacle";
            }
        }
    }
}
}
ctx.addEventListener("click", (event) => {

    console.log(event.offsetX)
    let clickType = document.click.clicktype.value;
    
    if(event.offsetY < 510){

    if(clickType === "start" && state.pickStart == false){
        checkClick("Yellow","Start");
        state.pickStart = true;
    }
    else if(clickType === "goal" && state.pickGoal == false){
        checkClick("Green","Goal");
        state.pickGoal = true;
    }
    else if(clickType === "obstacles"){
        checkClick("#777777","Obstacle");
        state.pickObstacles = true;
    }
}
   
});

document.getElementById("calculatePath").addEventListener("click", () => {
    let path = findShortestPath(start,grid);
    drawPath(start, path);
});
document.addEventListener("DOMContentLoaded", () => {
    drawBoard();
})
document.getElementById("clearCanvas").addEventListener("click", () => {
    canvas.clearRect(0, 0, 1000, 1000);
    drawBoard();

});

var drawPath = function(location, path){
    let nextLocation = {
        y: location[1] * 50 + 25,
        x: location[0] * 50 + 25
    }
    for (var i = 0; i < path.length; i++){
        
        canvas.beginPath();
        canvas.moveTo(nextLocation.x, nextLocation.y);
        if(path[i] === 'North'){
            nextLocation = {
                x: nextLocation.x,
                y: nextLocation.y - 50
            }
        }
        if(path[i] === 'South'){
            nextLocation = {
                x: nextLocation.x,
                y: nextLocation.y + 50
            }
        }
        if(path[i] === 'East'){
            nextLocation = {
                x: nextLocation.x + 50,
                y: nextLocation.y
            }
        }
        if(path[i] === 'West'){
            nextLocation = {
                x: nextLocation.x - 50,
                y: nextLocation.y
            }
        }
            canvas.lineTo(nextLocation.x, nextLocation.y);
            canvas.stroke();
    }
}

var findShortestPath = function(startCoordinates, grid) {
    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];
  
    
    var location = {
      distanceFromTop: distanceFromTop,
      distanceFromLeft: distanceFromLeft,
      path: [],
      status: 'Start'
    };
  
    var queue = [location];
  

    while (queue.length > 0) {

        var currentLocation = queue.shift();
  
      var newLocation = exploreInDirection(currentLocation, 'North', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore East
      var newLocation = exploreInDirection(currentLocation, 'East', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore South
      var newLocation = exploreInDirection(currentLocation, 'South', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore West
      var newLocation = exploreInDirection(currentLocation, 'West', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
    }
  
    // No valid path found
    return false;
  
  };
  
  var locationStatus = function(location, grid) {
    var gridSize = grid.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;
  
    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {
  
      // location is not on the grid--return false
      return 'Invalid';
    } else if (grid[dft][dfl] === 'Goal') {
      return 'Goal';
    } else if (grid[dft][dfl] !== 'Empty') {
      // location is either an obstacle or has been visited
      return 'Blocked';
    } else {
      return 'Valid';
    }
  };
  
  
  var exploreInDirection = function(currentLocation, direction, grid) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);
  
    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;
  
    if (direction === 'North') {
        dfl -= 1;
    } else if (direction === 'East') {
        dft += 1;
    } else if (direction === 'South') {
        dfl += 1;
    } else if (direction === 'West') {
        dft -= 1;
    }
  
    var newLocation = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      path: newPath,
      status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, grid);
  
    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === 'Valid') {
      grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
    }
  
    return newLocation;
  };
  