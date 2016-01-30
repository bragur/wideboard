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
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        var output = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';

        return output;
    },

    ajaxSaveParams: function(user, shapes, title, template) {
        var stringifiedArray = JSON.stringify(shapes);
        var parameters = {
            "user": user,
            "name": title,
            "content": stringifiedArray,
            "template": template
        };

        return parameters;
    },

    ajaxSaveCall: function(apiUrl, parameters) {
        console.log(parameters);

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: apiUrl,
            data: parameters,
            dataType: "jsonp",
            crossDomain: true,
            success: function(data) {
                console.log("Success: ", data);
                return true;
            },
            error: function(xhr, err) {
                console.log("Error: ", xhr, err);
                return false;
            }
        });
    },

    downloadList: function(user, apiUrl, getListHandler) {
        var parameters = { "user": user, "template": false };

        $.ajax({
            type: "GET",
            url: apiUrl,
            data: parameters,
            dataType: "jsonp",
            crossDomain: true,
            success: function(data) {
                getListHandler(true, data);
            },
            error: function(xhr, err) {
                getListHandler(false, xhr, err);
            }
        });
    },

    uploadShapes: function(shapes, user, apiUrl, title, template) {
        var parameters = this.ajaxSaveParams(user, shapes, title, template);

        if(this.ajaxSaveCall(apiUrl, parameters)) {
            console.log("Save was successful!");
        } else {
            console.log("Save was unsuccessful...");
        }
    },

    calculateCenter: function(boxSize) {
        var windowWidthCenter = $(window).width()/2;
        var windowHeightCenter = $(window).height()/2;
        return new Point(windowWidthCenter - boxSize.center().x, windowHeightCenter - boxSize.center().y);
    },

    blurElement: function(element, from, to, duration, log) {
        $({blurRadius: from}).animate({blurRadius: to}, {
            duration: duration,
            easing: 'swing', // or "linear"
                             // use jQuery UI or Easing plugin for more options
            step: function() {
                if (log) {
                    console.log(this.blurRadius);
                }
                $(element).css({
                    "-webkit-filter": "blur("+this.blurRadius+"px)",
                    "filter": "blur("+this.blurRadius+"px)"
                });
            }
        });
    },

    fixOpenData: function(data) {
        var items = new Array();
        for (var i = 0; i < data.length; i++) {
            var date = eval("new " + data[i].DateAdded.replace(/\//g, ""));
            var text = data[i].WhiteboardTitle + " [" + date.toString('dd/MM/yyyy HH:mm:ss') + "]";
            items.push({"id": data[i].ID, "text": text});
        }

        return items;
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
