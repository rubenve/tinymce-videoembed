tinymce-videoembed
==================

This TinyMCE plugin allows you to embed YouTube and Vimeo videos. It comes with a toolbar button and a menu item, both
of which pull up a dialog where you can paste an URL and optionally set the width and height of the video to embed.

#Installation
Copy the videoembed folder to your tinymce/plugins folder
    
#Usage
- Enable the plugin in your tinyMCE initialization code. This will also add an extra menu item to the Insert menu.
I.e.:
    tinyMCE.init({
        selector: "textarea",
        plugins: [
              "table contextmenu paste videoembed"
        ],
    });
    

- Add the button to the toolbar, like so:
    tinyMCE.init({
        selector: "textarea",
        toolbar: "insertfile undo redo | videoembed",
    });
    