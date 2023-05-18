$(function() {

    $('#btn').on('click', function () {
        $('#btn__top').toggleClass('rotateTop');
        $('#btn__middle').toggleClass('hideMiddle');
        $('#btn__bottom').toggleClass('rotateBottom');
        $('#btn__top, #btn__middle, #btn__bottom').toggleClass('changeColor');
        $('#pagenav').toggleClass('menuOpen');

        $('#pagenav a[href]').on('click', function (event) {
            $('#btn').trigger('click');
        });
    });
});