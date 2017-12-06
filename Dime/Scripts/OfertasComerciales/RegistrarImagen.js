function bs_input_file() {
    $(".input-file").before(
        function () {
            if (!$(this).prev().hasClass('input-ghost')) {
                var element = $("<input id='Archivo' name='Archivo' type='file' style='visibility:hidden; height:0'>");
                element.attr("name", $(this).attr("name"));
                element.change(function () {
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                    var reader = new FileReader(); //instanciamos el objeto de la api FileReader
                    reader.onload = function (e) {
                        document.getElementById("ImagenTransformada").src = e.target.result;
                    };
                        // read the image file as a data URL.
                    reader.readAsDataURL(this.files[0]);
                });

                $(this).find("button.btn-choose").click(function () {
                    element.click();
                });
                $(this).find("button.btn-reset").click(function () {
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor", "pointer");
                $(this).find('input').mousedown(function () {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;

            }

        }
    );

}
$(function () {
    bs_input_file();

});
