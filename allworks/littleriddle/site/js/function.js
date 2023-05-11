$(function () {
    // -----jQueryの記述----------------------------------------------------

    // 要素（mv）の高さを測る（共通）
    const mvHeight = $('#mv').height();

    // リサイズヘッダー
    $(window).on('scroll', function () {
        const ST = $(window).scrollTop();

        if (ST >= mvHeight) {
            $('#header__logo').addClass('resizeHeader');
        } else {
            $('#header__logo').removeClass('resizeHeader');
        }
    });

    // バーガーアイコン
    $('.btn').on('click', function () {
        $('#btn__top').toggleClass('rotateTop');
        $('#btn__middle').toggleClass('hideMiddle');
        $('#btn__bottom').toggleClass('rotateBottom');
        $('#btn').toggleClass('changeColor--01');
        $('#btn__top, #btn__middle, #btn__bottom').toggleClass('changeColor--02');

        // ナビゲーションをスライド表示させる
        $('#gnav').toggleClass('translateNav');

        // メニュー内リンクをクリックしたら、スライドメニューが閉じる（考査後追加）
        $('#gnav a[href]').on('click', function (event) {
            $('.btn').trigger('click');
        });

    });

    // モーダルウインドウ
    $('.swiper-item__img').on('click', function () {

        // クリックしたサムネイルが持っているdata-modal属性の値を調べる
        const modal = $(this).attr('data-modal');

        // 調べたdata-modalに対応するmodalをふわっと表示させる
        $(modal).fadeIn(function () {

            // モーダルをクリックすると
            $(this).on('click', function () {
                // 開いたモーダルが非表示になる
                $(this).fadeOut();
            });

            // moreボタンをクリックしても
            $('.modal__link').on('click', function (clickEvent) {
                // モーダルが非表示にならないようにする
                clickEvent.stopPropagation();
            });

        });
    });

    // スムーススクロール（gnav）
    $('.gnav__link').on('click', function () {

        // クリックした要素のhref属性の値を調べる
        const target = $(this).attr('href');
        // 変数名targetの座標を調べる 
        const targetPos = $(target).offset().top;
        // targetPosまでの移動をアニメーションさせる
        $('html, body').animate({ scrollTop: targetPos - 200 }, 400);
        // a要素のリンク機能を実行させない（一番下に記述）
        return false;
    });

    // スムーススクロール（sidenav）
    $('.sidenav__link').on('click', function () {
        const target = $(this).attr('href');
        const targetPos = $(target).offset().top;
        $('html, body').animate({ scrollTop: targetPos - 200 }, 400);
        return false;
    });

    // sidenavをMV超えたら表示
    $(window).on('scroll', function () {
        const ST = $(window).scrollTop();
        if (ST >= mvHeight) {
            $('#sidenav').addClass('appearMenu');
        } else {
            $('#sidenav').removeClass('appearMenu');
        }
    });

    // sidenavの現在地表示
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

    // アイテムセクションのアコーディオンパネル
    $('#reading__btn').on('click', function () {
        $('.reading__accordionbox').stop().slideToggle();
        $('#accordion-open').toggleClass('accordion-hide');
        $('#accordion-hide').toggleClass('accordion-open');
        $('#reading__btn').toggleClass('is-minus');
    });


    // -----jQueryの記述ここまで---------------------------------------------
});