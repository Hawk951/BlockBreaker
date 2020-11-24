class Ball {
    constructor(paddle, bricks) {
        this.score = score;
        this.bricks = bricks;
        this.width = 20;
        this.height = this.width;
        this.rad = this.width / 2;
        this.paddle = paddle;
        this.location = createVector(paddle.location.x + (paddle.width / 2), paddle.location.y - (this.height / 2));
        this.velocity = createVector(5, -5);
    }

    show() {
        fill(255);
        ellipse(this.location.x, this.location.y, this.width, this.height);      
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
        if(this.location.x + this.rad > paddle.location.x && this.location.x + this.rad < paddle.location.x + paddle.width) {
            // Ball is within y scope of paddle
            if(this.location.y + this.rad > paddle.location.y && this.location.y - this.rad < paddle.location.y + paddle.height) {
                this.reflectY();
            }
        }
    }

    brickCollision(brick) {
        // Ball is within x scope of brick
        if(this.location.x + this.rad > brick.location.x && this.location.x + this.rad < brick.location.x + brick.width) {
            // Ball is within y scope of paddle
            if(this.location.y + this.rad > brick.location.y && this.location.y - this.rad < brick.location.y + brick.height) {
                bricks.splice(bricks.indexOf(brick), 1);
                this.reflectY();
                return true;
            }
        }
        return false;
    }

    belowBottom() {
        return this.location.y - this.rad > height;
    }
}