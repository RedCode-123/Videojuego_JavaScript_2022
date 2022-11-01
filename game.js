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
let  playerPosition = {
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
    
    mapRowsCols.forEach((rowItem, rowIndex) => {
        rowItem.forEach((colItem, colIndex) => {
            let col =  colIndex + 1;
            let row = rowIndex +1
            game.fillText(emojis[colItem], gameSize * col, gameSize * row)
            if (!playerPosition.x && !playerPosition.y) {
                if (colItem == 'O') {
                    playerPosition.x = gameSize * col;
                    playerPosition.y = gameSize * row;
                    game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y)
                }
            } else {
                    game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y)
            }
        });
    });

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
        console.log(playerPosition.y);
    if (playerPosition.y > (canvasS/10)){
        playerPosition.y -= (canvasS/10);
        canvasSize();
    }

}
function moveLeft() {
    console.log('Hacia la izquierda');
}
function moveRight() {
    console.log('Hacia la derecha');
}
function moveDown() {
    console.log('Hacia abajo');
}