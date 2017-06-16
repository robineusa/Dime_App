$(function () {
    // Replace the <textarea id="editor1"> with a CKEditor
    // instance, using default configuration.
    console.log('prueba');
    CKEDITOR.replace('editor1');
    CKEDITOR.replace('editor2');
    CKEDITOR.replace('editor3');
    //bootstrap WYSIHTML5 - text editor
    $(".textarea").wysihtml5();
    
});