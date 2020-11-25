var paddle;
var ball;
var bricks;
var font;
var score;

function preload() {
    font = loadFont('assets/SourceSansPro-Regular.ttf');
}

function setup() {
    createCanvas(800, 600, WEBGL);
    noStroke();
    paddle = new Paddle(width / 2, height - 40);
    ball = new Ball(paddle, bricks, score);
    bricks = generateBricks(3, 8);
    score = 0;
}

function generateBricks(noRows, bricksPerRow) {
    const bricklist = [];
    for(let row = 0; row < noRows; row++) {  
        for(let i = 0; i < bricksPerRow; i++) {
            let brickWid = int(width / bricksPerRow);
            let brickHei = int(140 / noRows);
            bricklist.push(new Brick(brickWid / 2 + brickWid * i, 90 + (row * brickHei), brickWid - 20, brickHei - 20, pastelColor()));
        }
    }
    return bricklist;
}

function pastelColor() {
    return color(`hsl(${int(random(0, 360))}, 45%, 75%)`);
}

function draw() {
    translate(-400, -300, 0);
    pointLight(250, 250, 250, 0, 0, 500);
    background(51);
    textFont(font, 32);
    fill(255);
    text(`Score: ${this.score}`, width - 160, 40);
    paddle.show();
    for (const brick of bricks) {
        brick.show();
        if(ball.brickCollision(brick)) {
            score++;
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
        textSize(60);
        textAlign(CENTER, CENTER);
        text('Game Over', 0, height / 2, width);
        noLoop();            
    }
    if(bricks.length === 0) {
        textSize(60);
        textAlign(CENTER, CENTER);
        text('You Win!', 0, height / 2, width);
        noLoop();            
    }
}