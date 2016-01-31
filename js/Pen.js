var Pen = Shape.extend({
    constructor: function(position, color, fillColor, lineWidth) {
        this.path = new Array();
        this.lineWidth = lineWidth;
        this.base("Pen", position, color);
        this.minX = this.position.x;
        this.minY = this.position.y;
        this.maxX = this.position.x;
        this.maxY = this.position.y;
        this.xOffset = this.position.x;
        this.yOffset = this.position.y;
    },

    draw: function(canvas) {
        this.drawPath(canvas);

        this.base(canvas);
    },

    startDrawing: function(point) {
        this.path.push(point);
    },

    drawing: function(point) {
        this.path.push(point);
    },

    added: function(canvas) {
        for (var i = 0; i < this.path.length; i++) {
            if (this.path[i].x < this.minX) {
                this.minX = this.path[i].x;
            }
            if (this.path[i].x > this.maxX) {
                this.maxX = this.path[i].x;
            }
            if (this.path[i].y < this.minY) {
                this.minY = this.path[i].y;
            }
            if (this.path[i].y > this.maxY) {
                this.maxY = this.path[i].y;
            }
        }

        this.size.x = this.maxX - this.minX;
        this.size.y = this.maxY - this.minY;
        this.position.x = this.minX;
        this.position.y = this.minY;

        this.xOffset = this.position.x;
        this.yOffset = this.position.y;
    },

    drawPath: function(canvas) {
        // With some help from http://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas/7058606#7058606
        canvas.beginPath();
        canvas.strokeStyle = this.color;
        canvas.lineWidth = this.lineWidth;

        // Offset used to calculate move from original path array. Keeps each draw from an 
        // extra run through the path array to set each points new coordinates. Offset is 
        // added during draw.
        var xOff = this.position.x - this.xOffset;
        var yOff = this.position.y - this.yOffset;

        if (this.path.length > 1) {
            canvas.moveTo(this.path[1].x + xOff, this.path[1].y + yOff);

            for (var i = 1; i < this.path.length - 1; i++) {
                var c = (this.path[i].x + xOff + this.path[i + 1].x + xOff) / 2;
                var d = (this.path[i].y + yOff + this.path[i + 1].y + yOff) / 2;

                canvas.quadraticCurveTo(this.path[i].x + xOff, this.path[i].y + yOff, c, d);
            }

            canvas.stroke();
        }
    },
});
