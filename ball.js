class Ball {
    constructor(paddle, bricks) {
        this.score = score;
        this.bricks = bricks;
        this.width = 20;
        this.height = this.width;
        this.rad = this.width / 2;
        this.paddle = paddle;
        this.color = color('silver');
        this.location = createVector(paddle.location.x, paddle.location.y - (paddle.height / 2) - this.rad - 10);
        this.velocity = createVector(5, -5);
    }

    show() {
        push();
        fill(this.color);
        translate(this.location.x, this.location.y);
        sphere(this.rad, this.rad);
        pop();
    }

    reflectX() {
        this.velocity.x = this.velocity.x * -1;
    }

    reflectY() {
        this.velocity.y = this.velocity.y * -1;
    }

    update() {
        this.location.add(this.velocity);
    }

    boundryCollision() {
        if(this.location.x + this.rad > width || this.location.x - this.rad < 0) {
            this.reflectX();
        }
        if(this.location.y - this.rad < 0) {
            this.reflectY();
        }
    }

    paddleCollision() {
        // Ball is within x scope of paddle
        const ballX = this.location.x;
        const paddleMinX = paddle.location.x - (paddle.width / 2);
        const paddleMaxX = paddle.location.x + (paddle.width / 2);
        if(ballX > paddleMinX && ballX < paddleMaxX) {
            // Ball is within y scope of paddle
            console.log('x hit');
            const ballY = this.location.y + this.rad; // Bottom of ball
            const paddleMinY = paddle.location.y - (paddle.height / 2);
            const paddleMaxY = paddle.location.y + (paddle.height / 2);
            if(ballY > paddleMinY && ballY < paddleMaxY) {
                this.reflectY();
                console.log('y hit');
            }
        }
    }

    brickCollision(brick) {
        // Ball is within x scope of brick
        const ballX = this.location.x;
        const brickMinX = brick.location.x - (brick.width / 2);
        const brickMaxX = brick.location.x + (brick.width / 2);
        if(ballX > brickMinX && ballX < brickMaxX) {
            // Ball is within y scope of paddle
            const ballY = this.location.y;
            const brickMinY = brick.location.y - (brick.height / 2);
            const brickMaxY = brick.location.y + (brick.height / 2);
            if(ballY > brickMinY && ballY < brickMaxY) {
                let prev = p5.Vector.sub(this.location, this.velocity);
                if(prev.x > brickMinX && prev.x < brickMaxX) {
                    this.reflectY();
                }
                if(prev.y > brickMinY && prev.y < brickMaxY) {
                    this.reflectX();
                }
                return true;
            }
        }
        return false;
    }

    belowBottom() {
        return this.location.y - this.rad > height;
    }
}