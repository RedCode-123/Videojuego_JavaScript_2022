'use strict';
// Seleccionar el canvas
const canvas = document.querySelector('#game');

// Seleccionar el contexto del canvas:
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up') ;
const btnLeft = document.querySelector('#left') ;
const btnRight = document.querySelector('#right') ;
const btnDown = document.querySelector('#down') ;

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
    
    let map = maps[0];
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
                    }

                }
                if (colItem === 'X') {
                    let bombsPosition = {
                        x : gameSize * col,
                        y : gameSize * row
                    }
                    if ((playerPosition.x).toFixed(2) === (bombsPosition.x).toFixed(2) && (playerPosition.y).toFixed(2) === (bombsPosition.y).toFixed(2)){
                    console.log('colisión');
                    }
                }
            }
        });
    });
    movePlayer();
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