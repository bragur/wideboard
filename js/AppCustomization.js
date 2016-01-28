var AppCustomization = {
    init: function() {
        this.resizeCanvas();
        this.setHotKeys();
    },

    resizeCanvas: function() {
        canvas.width = $('#canvasContainer').width();
        canvas.height = $('#canvasContainer').height();
    },

    setHotKeys: function() {
        Mousetrap.bind('mod+z', function() {
            app.undo();
            return false;
        });
        Mousetrap.bind('mod+shift+z', function() {
            app.redo();
            return false;
        });
        Mousetrap.bind('mod+s', function() {
            console.log('save');
            return false;
            // app.save();
        });
        Mousetrap.bind('mod+o', function() {
            console.log('open');
            return false;
            // app.open();
        });
        Mousetrap.bind('c', function() {
            console.log('Open color picker');
            $('#colorPicker').trigger("click");
        });
        Mousetrap.bind('f', function() {
            console.log('Open fill picker');
            if ($('#fill').is(':visible')) {
                if (!$('#fill').is(':checked')) {
                    $('#fill').trigger("click");
                }
                $('#fillPicker').trigger("click");
            }
        });
    },
};
