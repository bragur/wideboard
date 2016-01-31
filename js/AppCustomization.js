var AppCustomization = {
    init: function() {
        this.resizeCanvas();
        this.setHotKeys();
        this.enableSaveAndOpen();
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

    enableCancel: function(dialog) {
        Mousetrap.bind('esc', function() {
            switch (dialog) {
                case 'open':
                    $('#cancelOpen').trigger("click");
                    break;
                case 'save':
                    $('#cancelSave').trigger("click");
                default:
                    break;
            }
        });
    },

    disableCancel: function(dialog) {
        Mousetrap.unbind('esc');
    },

    disableSaveAndOpen: function() {
        Mousetrap.bind('mod+s', function() {
            console.log("Not saving shit");
            return false;
        });
        Mousetrap.bind('mod+o', function() {
            console.log("Not opening shit");
            return false;
        });
    },

    enableSaveAndOpen: function() {
        Mousetrap.bind('mod+s', function() {
            AppChanges.openSaveDialog();
            return false;
        });
        Mousetrap.bind('mod+o', function() {
            app.getListFromApi();        
            return false;
        });
    },
};
