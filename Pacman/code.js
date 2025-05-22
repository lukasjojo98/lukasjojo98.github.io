import { findShortestPath } from './a-star.js';

const ROW_COUNT = 50;
const COL_COUNT = 50;
const enemyFilePath = "enemy.png";
let collectedItems = 0;
let map = null;
let grid = null;
let direction;

let pacmanRow = 0;
let pacmanCol = 0;

let enemyRow = 0;
let enemyCol = 0;

let interval = setInterval(gameLoop, 500);

function restartGame() {
    direction = null;
    if(interval == null){
        interval = setInterval(gameLoop, 500);
    }
    collectedItems = 0;
    updateGameScore();
    document.querySelector('.container').innerHTML = "";
    createMap();
}

async function loadMap(path) {
    const response = await fetch(path);
    const data = await response.json();
    return data.map;
}

function updateGameScore() {
    const scoreElement = document.querySelector('.score');
    scoreElement.innerHTML = 'Game Score: ' + 10 * collectedItems;
}

function removePacman() {
    const elements = document.querySelectorAll('.field-item');
    const index = pacmanRow * ROW_COUNT + pacmanCol;
    const element = elements[index];
    element.classList.remove('pacman-item');
    map[pacmanRow][pacmanCol] = 0;
}

function drawPacman() {
    const elements = document.querySelectorAll('.field-item');
    const index = pacmanRow * ROW_COUNT + pacmanCol;
    const element = elements[index];
    element.classList.add('pacman-item');
    map[pacmanRow][pacmanCol] = 3;
}

function drawEnemy() {
    const elements = document.querySelectorAll('.field-item');
    const index = enemyRow * ROW_COUNT + enemyCol;
    const element = elements[index];
    const enemy = document.createElement('img')
    enemy.src = enemyFilePath;
    element.classList.add('enemy-item');
    element.append(enemy);
    map[enemyRow][enemyCol] = 4;
}

function removeEnemy() {
    const elements = document.querySelectorAll('.field-item');
    const index = enemyRow * ROW_COUNT + enemyCol;
    const element = elements[index];
    element.classList.remove('enemy-item');
    try {
        const img = element.getElementsByTagName('img')[0];
        img.remove();
    } catch (error) {
        console.log("Error: " + error);
    }
    addCollectItem(element);
    map[enemyRow][enemyCol] = 0;
}

function resetGrid() {
    grid = new Array(ROW_COUNT);
    for (let i = 0; i < ROW_COUNT; i++) {
        grid[i] = new Array(COL_COUNT);
        
        for (let j = 0; j < COL_COUNT; j++) {

            if (map[i][j] == 1) {
                grid[i][j] = 'Obstacle';
            } 
            else if (map[i][j] == 0) {
                grid[i][j] = 'Empty';
            } 
            else {
                grid[i][j] = 'Empty';
            }
        }
    }

    grid[pacmanRow][pacmanCol] = "Goal";
}


function moveEnemy(direction) {
    if(direction == "North"){
        removeEnemy();
        enemyRow--;
        drawEnemy();
    }
    else if(direction == "East"){
        removeEnemy();
        enemyCol++;
        drawEnemy();
    }
    else if(direction == "South"){
        removeEnemy();
        enemyRow++;
        drawEnemy();
    }
    else if(direction == "West"){
        removeEnemy();
        enemyCol--;
        drawEnemy();
    }
}

function removeCollectItem() {
    const elements = document.querySelectorAll('.field-item');
    const index = pacmanRow * ROW_COUNT + pacmanCol;
    const element = elements[index];
    element.classList.remove('collect-item');
    try {
        element.removeChild(element.firstChild);
    } catch (error) {
    }
    collectedItems++;
    updateGameScore();
}

function addCollectItem(fieldItem) {
    if(fieldItem.classList.contains('collect-item')){
        return;
    }
    const circle = document.createElement('div')
    circle.classList.add('circle-item');
    fieldItem.classList.add('collect-item');
    fieldItem.append(circle);
}

async function createMap() {
    map = await loadMap('map.json');
    grid = new Array(ROW_COUNT);

    const container = document.querySelector('.container');
    
    for(let i = 0; i < ROW_COUNT; i++){
        grid[i] = new Array(COL_COUNT);
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row-item');
        const index = i + 1;
        rowContainer.id = "row-item-" + index;
        for(let j = 0; j < COL_COUNT; j++){
            const fieldItem = document.createElement('div');
            fieldItem.classList.add('field-item');
            if(map[i][j] == 1){
                fieldItem.classList.add('wall-item');
                grid[i][j] = 'Obstacle';
            }
            else if(map[i][j] == 0){
                addCollectItem(fieldItem);
                grid[i][j] = 'Empty';
            }
            else if(map[i][j] == 3){
                fieldItem.classList.add('pacman-item');
                pacmanRow = i;
                pacmanCol = j;
                grid[i][j] = 'Goal';
            }
            else if(map[i][j] == 4){
                const enemy = document.createElement('img')
                enemy.src = enemyFilePath;
                fieldItem.classList.add('enemy-item');
                fieldItem.append(enemy);
                grid[i][j] = 'Empty';
                enemyRow = i;
                enemyCol = j;
            }
            rowContainer.append(fieldItem);
        }
        container.append(rowContainer);
    }
}

function gameLoop() {
    if(pacmanCol == enemyCol && pacmanRow == enemyRow){
        alert("Game Over!");
        clearInterval(interval);
        interval = null;
    }
    if(direction == "up"){
        removeCollectItem();
        if(map[pacmanRow - 1][pacmanCol] !== 1) {
            removePacman();
            pacmanRow--;
            drawPacman();
        }
    }
    else if(direction == "down"){
        removeCollectItem();
        if(map[pacmanRow + 1][pacmanCol] !== 1) {
            removePacman();
            pacmanRow++;
            drawPacman();
        }
    }
    else if(direction == "right"){
        removeCollectItem();
        if(map[pacmanRow][pacmanCol + 1] !== 1) {
            removePacman();
            pacmanCol++;
            drawPacman();
        }
    }
    else if(direction == "left"){
        removeCollectItem();
        if(map[pacmanRow][pacmanCol - 1] !== 1) {
            removePacman();
            pacmanCol--;
            drawPacman();
        }
    }
    const path = findShortestPath([enemyRow, enemyCol], grid);
    moveEnemy(path[0]);
    resetGrid();
}

document.addEventListener("DOMContentLoaded", () => {
    createMap();
});

document.getElementById('restart-button').addEventListener('click', () => {
    restartGame();
});

document.addEventListener("keydown", (event) => {
    switch (event.which) {
        case 38:
            if(map[pacmanRow - 1][pacmanCol] == 1) {
                break;
            }
            direction = "up";
            // removePacman();
            // pacmanRow--;
            // drawPacman();
            break;
        case 40:
            if(map[pacmanRow + 1][pacmanCol] == 1) {
                break;
            }
            direction = "down";
            // removePacman();
            // pacmanRow++;
            // drawPacman();
            break;
        case 37:
            if(map[pacmanRow][pacmanCol - 1] == 1) {
                break;
            }
            direction = "left";
            // removePacman();
            // pacmanCol--;
            // drawPacman();
            break;
        case 39:
            if(map[pacmanRow][pacmanCol + 1] == 1) {
                break;
            }
            direction = "right";
            // removePacman();
            // pacmanCol++;
            // drawPacman();
            break;
    }

});