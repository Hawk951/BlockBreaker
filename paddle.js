class Paddle {
    constructor(x, y) {
        this.width = 130;
        this.height = 25;
        this.location = createVector(x - this.width / 2, y);
        this.speed = {
            left: createVector(-5, 0),
            right: createVector(5, 0)
        }
        this.color = color(255);
    }

    show() {
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height);
    }

    move(dir) {
        if (dir == 'l' && this.location.x > 0)
            this.location.add(this.speed.left);
        if (dir == 'r' && this.location.x + this.width < width)
            this.location.add(this.speed.right);
    }
}