const filep= require("filepond")


filep.registerPlugin(
    FilePoundPluginImagePreview,
    FilePoundPluginImageResize,
    FilePoundPluginImageEncode
)

FilePound.parse(document.body);