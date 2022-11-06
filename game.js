'use strict';
// Seleccionar el canvas
const canvas = document.querySelector('#game');

// Seleccionar el contexto del canvas:
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up') ;
const btnLeft = document.querySelector('#left') ;
const btnRight = document.querySelector('#right') ;
const btnDown = document.querySelector('#down') ;
const htmlLives = document.querySelector('#lives');
const htmlTime = document.querySelector('#time');
const htmlRecord = document.querySelector('#record');
const htmlResult = document.querySelector('#result');

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)
window.addEventListener('keydown', moveKeys)
let canvasS;
// let gameSize;
const  playerPosition = {
    x : undefined,
    y : undefined,
};
const  giftPosition = {
    x : undefined,
    y : undefined,
};
let level = 0;
let levelWin = false;
let collision = false;
let lives = 3;
let startTime;
let timeInterval;
let record;
let localRecord = +(localStorage.getItem('localRecord'));
/* 
Esperamos a que todo el html cargue 
para ejecutar el código de canvas
*/
window.addEventListener('load', canvasSize);
window.addEventListener('resize', 
() => {
playerPosition.x = undefined;
playerPosition.y = undefined;
canvasSize();
}
);

function canvasSize() {
    if(window.innerWidth < window.innerHeight) {
        canvasS = window.innerWidth * .8 ;
    } else {
        canvasS = window.innerHeight* .8 ;
    }
    startGame();
}

function startGame() {
    canvas.setAttribute('width', canvasS);
    canvas.setAttribute('height', canvasS);
    let gameSize = canvasS / 10;
    game.font = gameSize + 'px Verdana';
    game.textAlign = 'end';
    
    showLives(lives);

    if (localRecord) {
        htmlRecord.innerText = localRecord;
    }

    let map = maps[level];

    if (!maps[level]) {
        endGame()
        return;
    }
    if (!startTime) {
        runTimer();
    }

    let mapRows = map.trim().split('\n');
    let mapRowsCols = mapRows.map(row => row.trim().split(''));
    game.clearRect(0,0, canvasS, canvasS);
    mapRowsCols.forEach((rowItem, rowIndex) => {
        rowItem.forEach((colItem, colIndex) => {
            let col =  colIndex + 1;
            let row = rowIndex +1
            game.fillText(emojis[colItem], gameSize * col, gameSize * row)
            if (!playerPosition.x && !playerPosition.y) {
                if (colItem === 'O') {
                    playerPosition.x = gameSize * col;
                    playerPosition.y = gameSize * row;
                }
            } else {
                if (colItem === 'I') {
                    giftPosition.x =  gameSize * col;
                    giftPosition.y = gameSize * row;
                    if ((playerPosition.x).toFixed(2) === (giftPosition.x).toFixed(2) && (playerPosition.y).toFixed(2) === (giftPosition.y).toFixed(2)){
                    console.log('Llegamos a la meta');
                    levelWin = true;
                    }

                }
                if (colItem === 'X') {
                    let bombsPosition = {
                        x : gameSize * col,
                        y : gameSize * row
                    }
                    if ((playerPosition.x).toFixed(2) === (bombsPosition.x).toFixed(2) && (playerPosition.y).toFixed(2) === (bombsPosition.y).toFixed(2)){
                    console.log('colisión');
                    collision = true;
                    }
                }
            }
        });
    });

    if (levelWin === true) {
        passToTheNextLevel();
    }
    if (collision === true) {
        itIsACollision();
    }
    movePlayer();
}
function runTimer() {
    startTime = Date.now();
    timeInterval = setInterval(()=> {
        htmlTime.innerText = ((Date.now() - startTime)/1_000) + ' s';
    },100);
}
function endGame() {
    console.log('Se alcanzó el máximo de niveles');
    clearInterval(timeInterval);
    record = (Date.now() - startTime)/1_000
    if ( !localRecord ) {
        localStorage.setItem('localRecord', record);
        htmlResult.innerText = 'Es el primer record, ahora, intenta superarlo.';
    } else if (record <= localRecord){
        localStorage.setItem('localRecord', record);
        htmlResult.innerText = `Felicidades tu record es de ${record} s.`;
    }else if(record > localRecord){
        htmlResult.innerText = 'Lo siento no lograste superar el record actual.';
    }
    startTime = undefined;
}
function itIsACollision() {
        lives--;
        if (lives === 0) {
            console.log('Perdiste');
            level = 0;
            lives = 3;
            startTime = undefined; 
        }
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        collision = false;
        canvasSize();
}
function passToTheNextLevel(){
        console.log('Pasaste de Nivel');
        level += 1;
        levelWin = false;
        canvasSize();
}

function showLives(n) {
    htmlLives.innerText = emojis['HEART'].repeat(n);
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y)
}
function moveKeys(event) {
    const keys = {
        'ArrowUp': moveUp,
        'ArrowLeft': moveLeft,
        'ArrowRight': moveRight,
        'ArrowDown': moveDown
    };
    // event.key nos devuelve la key de la tecla presionada
    if (keys[event.key]) {
        keys[event.key]();
    }
}

function moveUp() {
        // console.log('Hacia arriba');
    if (playerPosition.y > (canvasS/10)){
        playerPosition.y -= (canvasS/10);
        canvasSize();
    }

}
function moveLeft() {
    // console.log('Hacia la izquierda');
    if (playerPosition.x > (canvasS/10)){
        playerPosition.x -= (canvasS/10);
        canvasSize();
    }
}
function moveRight() {
    // console.log('Hacia la derecha');
    if (playerPosition.x < canvasS){
        playerPosition.x += (canvasS/10);
        canvasSize();
    }
}
function moveDown() {
    // console.log('Hacia abajo');
    if (playerPosition.y < canvasS){
        playerPosition.y += (canvasS/10);
        canvasSize();
    }
}