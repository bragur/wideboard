var Rectangle = Shape.extend({
    constructor: function(position, color, fillColor, lineWidth) {
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
        this.base("Rectangle", position, color);
    },

    draw: function(canvas) {
        this.drawRectangle(canvas);

        this.base(canvas);
    },

    drawing: function(point) {
        this.size.x = point.x - this.position.x;
        this.size.y = point.y - this.position.y;
    },

    added: function(canvas) {
        if (this.size.x < 0) {
            this.position.x += this.size.x;
            this.size.x = Math.abs(this.size.x);
        }

        if (this.size.y < 0) {
            this.position.y += this.size.y;
            this.size.y = Math.abs(this.size.y);
        }
    },

    drawRectangle: function(canvas) {
        canvas.strokeStyle = this.color;
        canvas.lineWidth = this.lineWidth;
        if (this.fillColor !== undefined) {
            canvas.fillStyle = this.fillColor;
            canvas.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        }
        canvas.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
});
