class Brick {
    constructor(x, y, width, height, color) {
        this.location = createVector(x, y);
        this.width = width;
        this.height = height
        this.depth = 30;
        this.color = color;
        this.points = 1;
    }

    show() {
        push();
        fill(this.color);
        translate(this.location.x, this.location.y);
        box(this.width, this.height, this.depth);
        pop();
    }
}