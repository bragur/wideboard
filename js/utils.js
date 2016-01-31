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

    ajaxSaveCall: function(apiUrl, parameters, then) {
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
                then('Save successful!');
            },
            error: function(xhr, err) {
                console.log("Error: ", xhr, err);
                then('Unable to save, please try again', -1);
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

    uploadShapes: function(shapes, user, apiUrl, title, template, then) {
        var parameters = this.ajaxSaveParams(user, shapes, title, template);
        this.ajaxSaveCall(apiUrl, parameters, then);
    },

    downloadShapes: function(apiUrl, id, getDrawingHandler) {
        var parameters = {"id": id};

        $.ajax({
            type: "GET",
            url: apiUrl,
            data: parameters,
            dataType: "jsonp",
            crossDomain: true,
            success: function(data) {
                getDrawingHandler(data);
            },
            error: function(xhr, err) {
                getDrawingHandler("error");
            }
        });
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
            console.log(date.toString());
            var mom = new moment(date.toString());
            var text = data[i].WhiteboardTitle + " [ " + mom.calendar() + " ]";
            items.push({"id": data[i].ID, "text": text});
        }

        return items;
    },

    convertJsonShapes: function(data) {
        console.log(data);
        var arr = $.parseJSON(data);
        var newShapes = new Array();

        for (var i = 0; i < arr.length; i++) {
            var position = new Point(arr[i].position.x, arr[i].position.y);
            console.log(arr[i].name);
            switch(arr[i].name) {
                case 'Rectangle':
                    var shape = new Rectangle(position, arr[i].color, arr[i].fillColor, arr[i].lineWidth);
                    break;
                case 'Ellipse':
                    var shape = new Ellipse(position, arr[i].color, arr[i].fillColor, arr[i].lineWidth);
                    break;
                case 'Circle':
                    var shape = new Ellipse(position, arr[i].color, arr[i].fillColor, arr[i].lineWidth);
                    break;
                case 'Line':
                    var shape = new Line(position, arr[i].color, arr[i].fillColor, arr[i].lineWidth);
                    break;
                case 'Pen':
                    var shape = new Pen(position, arr[i].color, arr[i].fillColor, arr[i].lineWidth);
                    break;
                case 'Text':
                    var shape = new Text(position, arr[i].color, arr[i].fillColor, arr[i].lineWidth, arr[i].font, arr[i].string);
                default:
                    var shape = null;
                    break;
            }
            shape.size = new Point(arr[i].size.x, arr[i].size.y);
            newShapes.push(shape);
        }

        return newShapes;
    },

    save: function() {
        var title = $('#save-filename').val();
        var template = $('#save-template').is(':checked');
        app.saveToApi(title, template);
    }
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
