/**
 * TinyMCE plugin for embedding YouTube and Vimeo videos. It parses the URL and renders the required embed code.
 * The plugin is compatible with TinyMCE 4.x
 *
 * @author Ruben van Engelenburg <ruben@resoftsol.com>
 * @created October 15 2014
 * @version 1.0
 */
(function() {
    var defaultWidth = 500;
    var defaultHeight = 375;

    function videoEmbedDialog(editor) {
        editor.windowManager.open({
            title: 'Add Video',
            width: 500,
            height: 200,
            body: [
                {type: 'textbox', name: 'video_url', label: 'Video URL'},
                {type: 'textbox', name: 'width', label: 'Width', 'value': defaultWidth.toString()},
                {type: 'textbox', name: 'height', label: 'Height', 'value': defaultHeight.toString()},
            ],
            onsubmit: function (e) {
                // Validate video URL
                var videoURL = e.data.video_url;
                var width = e.data.width;
                var height = e.data.height;
                if (videoURL != '' && (videoURL.indexOf('vimeo.com') >= 0 || videoURL.indexOf('youtube.com') >= 0 || videoURL.indexOf('youtu.be') >= 0)) {
                    if (videoURL.indexOf('http://') != 0 && videoURL.indexOf('https://') != 0) {
                        videoURL = 'http://' + videoURL;
                    }

                    var embedCode = '';
                    if (videoURL.indexOf('vimeo.com') >= 0) {
                        embedCode = '<iframe src="' + videoURL + '" width="' + width + '" height="' + height + '" ' +
                        'frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                    }
                    else if (videoURL.indexOf('youtube.com') >= 0 || videoURL.indexOf('youtu.be') >= 0) {
                        embedCode = videoURL.replace(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g,
                            '<iframe width="' + width + '" height="' + height + '" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
                    }

                    editor.insertContent(embedCode);
                }
            }
        });
    }

    tinymce.PluginManager.add('videoembed', function (editor, url) {
        // Add a button that opens a window
        editor.addButton('videoembed', {
            text: 'Add Video',
            icon: 'media',
            onclick: function () {
                videoEmbedDialog(editor);
            }
        });

        // Adds a menu item to the tools menu
        editor.addMenuItem('videoembed', {
            text: 'Add Video',
            context: 'insert',
            icon: 'media',
            onclick: function () {
                videoEmbedDialog(editor);
            }
        });
    });
})();