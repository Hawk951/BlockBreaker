class Paddle {
    constructor(x, y) {
        this.width = 130;
        this.height = 25;
        this.depth = 20;
        this.location = createVector(x, y);
        this.speed = {
            left: createVector(-5, 0),
            right: createVector(5, 0)
        }
        this.color = color(255);
    }

    show() {
        push();
        translate(this.location.x, this.location.y);
        fill(this.color);
        box(this.width, this.height, this.depth);
        pop();
    }

    move(dir) {
        if (dir == 'l' && this.location.x - this.width / 2 > 0)
            this.location.add(this.speed.left);
        if (dir == 'r' && this.location.x + this.width / 2 < width)
            this.location.add(this.speed.right);
    }
}