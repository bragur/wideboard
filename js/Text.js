var Text = Shape.extend({
    constructor: function(position, color, fillColor, lineWidth, font, str) {
        this.font = font;
        this.string = str;
        this.lineWidth = lineWidth;
        this.base("Text", position, color);
        this.offset = false;
        this.sizeOffset = 0;
        this.finalPos = position;
    },

    draw: function(canvas) {
        this.drawText(canvas);
        this.base(canvas);
    },

    startDrawing: function(point, canvas) {
        AppChanges.getText(point);
    },

    drawing: function(point) {
    },

    added: function(canvas) {
        this.size = new Point(canvas.measureText(this.string).width + 50, 50);
        this.position.y -= 20 + this.sizeOffset;
        this.offset = true;
    },

    drawText: function(canvas) {
        canvas.font = this.font;
        canvas.fillStyle = this.color;
        if (this.font !== undefined) {
            this.sizeOffset = parseInt(this.font.split(" ")[1].replace("px", "")) - 7;
            if (this.offset) {
                canvas.fillText(this.string, this.position.x, this.position.y + 20 + this.sizeOffset);
            } else {
                canvas.fillText(this.string, this.position.x, this.position.y + this.sizeOffset);
            }
        }
    },
});
