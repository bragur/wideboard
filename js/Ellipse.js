var Ellipse = Shape.extend({
    constructor: function(position, color, fillColor, lineWidth) {
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
        this.base("Circle", position, color);
    },

    draw: function(canvas) {
        this.drawEllipse(canvas);

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

    drawEllipse: function(canvas) {
        // With help from http://stackoverflow.com/a/2173084
        var kappa = .5522848,
            ox = (this.size.x / 2) * kappa,
            oy = (this.size.y / 2) * kappa,
            xe = this.position.x + this.size.x,
            ye = this.position.y + this.size.y,
            xm = this.position.x + (this.size.x / 2),
            ym = this.position.y + (this.size.y / 2);

        canvas.strokeStyle = this.color;
        canvas.lineWidth = this.lineWidth;
        canvas.beginPath();
        canvas.moveTo(this.position.x, ym);
        canvas.bezierCurveTo(this.position.x, ym - oy, xm - ox, this.position.y, xm, this.position.y);
        canvas.bezierCurveTo(xm + ox, this.position.y, xe, ym - oy, xe, ym);
        canvas.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        canvas.bezierCurveTo(xm - ox, ye, this.position.x, ym + oy, this.position.x, ym);
        if (this.fillColor !== undefined) {
            canvas.fillStyle = this.fillColor;
            canvas.fill();
        }
        canvas.stroke();
    }
});
