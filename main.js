var paddle;
var ball;
var bricks;
var font;
var score;
var scoreObj;

function preload() {
    font = loadFont('assets/PressStart2P-vaV7.ttf');
}

function setup() {
    createCanvas(800, 600, WEBGL);
    noStroke();
    paddle = new Paddle(width / 2, height - 40);
    ball = new Ball(paddle, bricks, score);
    bricks = generateBricks(3, 8);
    score = 0;
    scoreObj = new ProjectText('Score: '+score, font, 30, width - 260, 40, 20);
}

function generateBricks(noRows, bricksPerRow) {
    let spacing = 20;
    const bricklist = [];
    for(let row = 0; row < noRows; row++) {  
        for(let i = 0; i < bricksPerRow; i++) {
            let brickWid = int((width - spacing) / bricksPerRow);
            let brickHei = int(140 / noRows);
            bricklist.push(new Brick(spacing / 2 + (brickWid / 2 + brickWid * i), 90 + (row * brickHei), brickWid - spacing, brickHei - spacing, pastelColor()));
        }
    }
    return bricklist;
}

function pastelColor() {
    return color(`hsl(${int(random(0, 360))}, 45%, 75%)`);
}

function draw() {
    background(51);
    translate(-400, -300, 0);
    ambientLight(100);
    pointLight(500, 500, 250, 0, 0, 500);
    scoreObj.show();
    textFont(font, 25);
    paddle.show();
    for (const brick of bricks) {
        brick.show();
        if(ball.brickCollision(brick)) {
            score += brick.points;
            scoreObj.update('Score: '+score);
            bricks.splice(bricks.indexOf(brick), 1);
        }
    }
    ball.boundryCollision();
    ball.paddleCollision();
    ball.update();    
    ball.show();
    if (keyIsDown(LEFT_ARROW)) {
        paddle.move('l')
      }
    if (keyIsDown(RIGHT_ARROW)) {
        paddle.move('r');
    }
    if(ball.belowBottom()) {
        new ProjectText('Game Over', font, 60, 100, height / 2 + 40, 20);
        noLoop();            
    }
    if(bricks.length === 0) {
        new ProjectText('You Win!', font, 60, 0, height / 2, 20);
        noLoop();            
    }
}