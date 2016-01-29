var Line = Shape.extend({
    constructor: function(position, color, fillColor, lineWidth) {
        this.lineWidth = lineWidth;
        this.base("Line", position, color);
        this.reverse = false;
    },

    draw: function(canvas) {
        this.drawLine(canvas);

        this.base(canvas);
    },

    startDrawing: function(point) {
        this.size.x = this.endX = point.x - this.position.x;
        this.size.y = this.endY = point.y - this.position.y;
    },

    drawing: function(point) {
        this.size.x = this.endX = point.x - this.position.x;
        this.size.y = this.endY = point.y - this.position.y;
    },

    added: function(canvas) {
        // Needed to correct the line if it starts in parent rectangles lower left corner.
        if (this.size.x >= 0 && this.size.y < 0 || this.size.x < 0 && this.size.y >= 0) {
            this.reverse = true;
        }

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
        if (this.reverse){
            canvas.moveTo(this.position.x, this.position.y + this.size.y);
            canvas.lineTo(this.size.x + this.position.x, this.position.y);
        } else {
            canvas.moveTo(this.size.x + this.position.x, this.size.y + this.position.y);
            canvas.lineTo(this.position.x, this.position.y);
        }

        canvas.stroke();
    },

});
