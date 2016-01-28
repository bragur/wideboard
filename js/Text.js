var Text = Shape.extend({
    constructor: function(position, color, fillColor, lineWidth, font) {
        this.font = font;
        this.lineWidth = lineWidth;
        this.base("Text", position, color);
    },

    draw: function(canvas) {

        this.base(canvas);
    },

    startDrawing: function(point, canvas) {
        point.log("Ætla að skrifa hér");
        AppChanges.getText(point);
    },

    drawing: function(point) {
    },

    added: function(canvas) {
    },

    drawText: function(canvas) {
        canvas.font = this.font;
        canvas.fillStyle = this.color;
        canvas.fillText("Hallóhalló", this.position.x, this.position.y);
    },
});
