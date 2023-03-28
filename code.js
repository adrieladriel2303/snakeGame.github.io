//canvas
let blockSize = 25;
let rows = 20;
let cols = 20;
let canvas;
let context; 

//snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let snakeBody = [];

let velocityX = 0;
let velocityY = 0;

//food
let foodX;
let foodY;

//score
let score = 0;
let scoreText = document.getElementById("score");

//game over
let gameOver = false;


window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = rows * blockSize;
    canvas.width = cols * blockSize;
    context = canvas.getContext("2d"); //used for drawing on the canvas

    appearFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);
    
}

function update() {
    //gameOver
    if(gameOver){
        return;
    }
    //canvas
    context.fillStyle="#1568A7";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //food
    context.fillStyle ="#EF959D";
    context.fillRect(foodX , foodY, blockSize, blockSize);

    //collision

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        appearFood();
        score++;
        console.log(score);
    }


    for(let i = snakeBody.length-1; i >0; i-- ){
          snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
    //snake
    context.fillStyle ="#B8D8BA";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY, blockSize, blockSize);
    for(let i=0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //gameOver conditions
    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        alert('Game Over :( ,refresh the page to start again, your score was ' + score);
    }

    for(let i = 0; i< snakeBody.length; i++)
    if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
        gameOver = true;
        alert('Game Over :( ,refresh the page to start again, your score was ' + score)
    }
    
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function appearFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}



