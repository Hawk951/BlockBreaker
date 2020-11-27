class ProjectText {
    constructor(text, font, fontSize, x, y, depth) {
        this.text = text;
        this.font = font;
        this.x = x;
        this.y = y;
        this.depth = depth;
        this.models = [];
        this.fontSize = fontSize;
        this.update(text);
        this.show();
    }

    update(text) {
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            this.models[i] = font.textToPoints(char, 0, 0, this.fontSize, {
                sampleFactor: 0.3,
                simplifyThreshold: 0.5
                });
        }
    }

    show() {
        let offset = 0;
        for (const model of this.models) {
            push();
            stroke(2);
            translate(this.x + (offset * this.fontSize), this.y);
            // front face
            fill(255);
            beginShape(TESS);
            for(let point of model) {
                vertex(point.x, point.y, 0);
            }
            endShape(CLOSE);    
            // Back face
            beginShape(TESS);
            for(let point of model) {
                vertex(point.x, point.y, - this.depth);
            }
            endShape();
            // Sides
            fill(100);
            beginShape(TRIANGLE_STRIP);
            for(let point of model) {
                vertex(point.x, point.y, 0);
                vertex(point.x, point.y, - this.depth);
            }
            endShape(CLOSE);

            offset++;
            pop();
        }
    }
}