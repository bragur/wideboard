var Pen = Shape.extend({
    constructor: function(position, color, fillColor, lineWidth) {
        this.path = new Array();
        this.lineWidth = lineWidth;
        this.base("Pen", position, color);
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
        // for (var i = 0; i < this.path.length; i++) {
        //     if (this.path[i].x < this.position.x) {
        //         this.position.x = this.path[i].x;
        //     }
        //     if (this.path[i].x > this.size.x) {
        //         this.size.x = this.path[i].x;
        //     }
        //     if (this.path[i].y < this.position.y) {
        //         this.position.y = this.path[i].y;
        //     }
        //     if (this.path[i].y > this.size.y) {
        //         this.size.y = this.path[i].y;
        //     }
        // }
    },

    drawPath: function(canvas) {
        // With some help from http://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas/7058606#7058606
        canvas.beginPath();
        canvas.strokeStyle = this.color;
        canvas.lineWidth = this.lineWidth;
        canvas.moveTo(this.path[0].x, this.path[0].y);

        for (var i = 1; i < this.path.length - 1; i++) {
            var c = (this.path[i].x + this.path[i + 1].x) / 2;
            var d = (this.path[i].y + this.path[i + 1].y) / 2;

            canvas.quadraticCurveTo(this.path[i].x, this.path[i].y, c, d);
        }

        canvas.stroke();
    },
});
