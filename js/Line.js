var Line = Shape.extend({
    constructor: function(position, color, fillColor, lineWidth) {
        this.lineWidth = lineWidth;
        this.base("Line", position, color);
    },

    draw: function(canvas) {
        this.drawLine(canvas);

        this.base(canvas);
    },

    startDrawing: function(point) {
        this.size.x = point.x;
        this.size.y = point.y;
    },

    drawing: function(point) {
        this.size.x = point.x;
        this.size.y = point.y;
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

    drawLine: function(canvas) {
        canvas.strokeStyle = this.color;
        canvas.lineWidth = this.lineWidth;

        canvas.beginPath();
        canvas.moveTo(this.size.x, this.size.y);
        canvas.lineTo(this.position.x, this.position.y);
        canvas.stroke();
    },
});
