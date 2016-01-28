var utils = {
    arrayToString: function(arr) {
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            str += arr[i];
            (i < arr.length - 1) ? str += " ": str += "";
        }
        return str;
    },

    hex2rgb: function(hex, opacity) {
        hex = hex.replace(/[^0-9A-F]/gi, '');
        var bigint = parseInt(hex, 16);
        console.log(bigint);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        var output = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
        console.log("hex2rgb", output);

        return output;
    },
}

// With some help from http://stackoverflow.com/a/32337430
$.fn.autoSize = function(o) {
    o = $.extend({}, {
        on: 'keyup'
    }, o);

    var $canvas = $('<canvas/>').css({
        position: 'absolute',
        left: -9999
    });
    $('body').append($canvas);

    var ctx = $canvas[0].getContext('2d');

    return this.on(o.on, function() {
        var $this = $(this);
        ctx.font = $this.css('font');
        var width = ctx.measureText($this.val()).width
        if (width > 200) {
            $this.width(width + 'px');
        }
    })
}
