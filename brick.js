class Brick {
    constructor(x, y, color) {
        this.location = createVector(x, y);
        this.width = 80;
        this.height = 30;
        this.color = color;
    }

    show() {
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height)
    }
}