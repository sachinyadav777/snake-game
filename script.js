// game constant and variables.......................
let inputdir = { x: 0, y: 0 };
let board = document.querySelector(".game-container");
const foodsound = new Audio("song/food.mp3")
const oversound = new Audio("song/gameover.mp3")
const movesound = new Audio("song/move.mp3")
const musicsound = new Audio("song/music.mp3")
let speed = 10;
let score = 0;
let hyscore = 0;
let lastpointtime = 0;
let snakearr = [
    { x: 13, y: 15 }
];
let food = { x: 7, y: 9 };

// game functions.......
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpointtime) / 1000 < 1 / speed) {
        return;
    }
    // console.log("hello")
    lastpointtime = ctime;
    gameEngine();
}

function isCollide(snake){
    // when snake collide itself......
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // when snake bump in to the wall.....
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >=18 || snake[0].y <= 0)
    return true;
}
function gameEngine() {
    // update the snake array and food...
    if(isCollide(snakearr)){
        oversound.play();
        inputdir = { x: 0, y: 0 };
        if(score > hyscore){
             hyscore = score;
        highscoreBox.innerHTML = "HIGH-S :" + hyscore;
        }
       
        alert("Game over, press any key to play again");
        snakearr = [{ x: 13, y: 15 }];
        score = 0;
        scoreBox.innerHTML = "SCORE :" + score;
    }
    //if you have eaten the food,increase the score and regenerate the food...
    if (snakearr[0].x === food.x && snakearr[0].y === food.y) {
        foodsound.play();
        score += 1;
        scoreBox.innerHTML = "SCORE :" + score;
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // moving a snkake.............
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

    // display the snake and food...
    // display snake...
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("tail");
        }
        board.appendChild(snakeElement);
    });

    // display food....
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}
//game logic here.......
window.requestAnimationFrame(main);
window.addEventListener("keydown", function (e) {
    // inputdir = {x:0 , y:1};
    switch (e.key) {
        case "ArrowDown":
            movesound.play();
            inputdir.x = 0;
            inputdir.y = 1;
            // console.log("ArrowDown")
            break;
        case "ArrowLeft":
            movesound.play();
            inputdir.x = -1;
            inputdir.y = 0;
            // console.log("Arrowleft")
            break;
        case "ArrowUp":
            movesound.play();
            inputdir.x = 0;
            inputdir.y = -1;
            // console.log("Arrowup")
            break;
        case "ArrowRight":
            movesound.play();
            inputdir.x = 1;
            inputdir.y = 0;
            // console.log("Arrowright")
            break;

        default:
            break;
    }
})
