$(function () {
    const mvHeight = $('#mv').height();
    $(window).on('scroll', function () {
        const ST = $(window).scrollTop();

        if (ST >= mvHeight) {
            $('#header__logo').addClass('resizeHeader');
        } else {
            $('#header__logo').removeClass('resizeHeader');
        }
    });

    $('.btn').on('click', function () {
        $('#btn__top').toggleClass('rotateTop');
        $('#btn__middle').toggleClass('hideMiddle');
        $('#btn__bottom').toggleClass('rotateBottom');
        $('#btn').toggleClass('changeColor--01');
        $('#btn__top, #btn__middle, #btn__bottom').toggleClass('changeColor--02');

        $('#gnav').toggleClass('translateNav');

        $('#gnav a[href]').on('click', function (event) {
            $('.btn').trigger('click');
        });
    });

    $('.swiper-item__img').on('click', function () {
        const modal = $(this).attr('data-modal');
        $(modal).fadeIn(function () {
            $(this).on('click', function () {
                $(this).fadeOut();
            });

            $('.modal__link').on('click', function (clickEvent) {
                clickEvent.stopPropagation();
            });
        });
    });

    $('.gnav__link').on('click', function () {
        const target = $(this).attr('href');
        const targetPos = $(target).offset().top;
        $('html, body').animate({ scrollTop: targetPos - 200 }, 400);
        return false;
    });

    $('.sidenav__link').on('click', function () {
        const target = $(this).attr('href');
        const targetPos = $(target).offset().top;
        $('html, body').animate({ scrollTop: targetPos - 200 }, 400);
        return false;
    });

    $(window).on('scroll', function () {
        const ST = $(window).scrollTop();
        if (ST >= mvHeight) {
            $('#sidenav').addClass('appearMenu');
        } else {
            $('#sidenav').removeClass('appearMenu');
        }
    });

    const elemTop = [];
    function PositionCheck() {
        const offset = 200;
        $('.scroll-point').each(function (i) {
            elemTop[i] = Math.round(parseInt($(this).offset().top - offset));
        });
    }

    function ScrollAnime() {
        const scroll = Math.round($(window).scrollTop());
        const NavElem = $('.sidenav__link');
        $('.sidenav__link') .removeClass('current');
        if (scroll >= 0 && scroll < elemTop[1]) {
            $(NavElem[0]).addClass('current');

        } else if (scroll >= elemTop[1] && scroll < elemTop[2]) {
            $(NavElem[1]).addClass('current');
        } else if (scroll >= elemTop[2] && scroll < elemTop[3]) {
            $(NavElem[2]).addClass('current');
        } else if (scroll >= elemTop[3] && scroll < elemTop[4]) {
            $(NavElem[3]).addClass('current');
        } else if (scroll >= elemTop[4]) {
            $(NavElem[4]).addClass('current');
        }
    }

    $(window).scroll(function () {
        PositionCheck();
        ScrollAnime();
    });

    $(window).resize(function () {
        PositionCheck()
    });

    $('#reading__btn').on('click', function () {
        $('.reading__accordionbox').stop().slideToggle();
        $('#accordion-open').toggleClass('accordion-hide');
        $('#accordion-hide').toggleClass('accordion-open');
        $('#reading__btn').toggleClass('is-minus');
    });
});