$(function(){
// -----jQueryの記述----------------------------------------------------

    // ハンバーガーメニューボタン
    $('#burgerBtn').on('click', function () {
        $('#burgerBtn__top').toggleClass('rotate-top');
        $('#burgerBtn__middle').toggleClass('hide-middle');
        $('#burgerBtn__bottom').toggleClass('rotate-bottom');
        $('#gnav').toggleClass('gnav-active');
        $('#gnav__nav').toggleClass('gnav__nav-active');
    });

    $(window).on('scroll', function() {
        const ST = $(window).scrollTop();
        const mvHeight = $('#mv').height();
        
        if(ST >= mvHeight){
            $('#burgerBtn__top, #burgerBtn__middle, #burgerBtn__bottom').addClass('changeColorBtn');
            $('#reserve__link').addClass('changeColorReserve');
        }else{
            $('#burgerBtn__top, #burgerBtn__middle, #burgerBtn__bottom').removeClass('changeColorBtn');
            $(' #reserve__link').removeClass('changeColorReserve');
        }
    });

    // ナビゲーション操作
    $('.gnav__link').on('click', function () {
        $('#burgerBtn__top').removeClass('rotate-top');
        $('#burgerBtn__middle').removeClass('hide-middle');
        $('#burgerBtn__bottom').removeClass('rotate-bottom');
        $('#gnav').removeClass('gnav-active');
        $('#gnav__nav').removeClass('gnav__nav-active');

        // スムーススクロール
        const target = $(this).attr('href');
        const targetPos = $(target).offset().top;
        $('html, body').animate({'scrollTop': targetPos}, 500);
    })


    $('.pagenav__link').on('click', function(){
        const target = $(this).attr('href');
        const targetPos = $(target).offset().top;
        $('html, body').animate({scrollTop: targetPos}, 500);
        return false;
    });

    $('.fnav__link').on('click', function(){
        const target = $(this).attr('href');
        const targetPos = $(target).offset().top;
        $('html, body').animate({scrollTop: targetPos}, 500);
        return false;
    });    


    $('#footer__totopbtn').on('click', function(){
        $('html, body').animate({scrollTop: 0}, 500);
    });


    
// -----jQueryの記述ここまで---------------------------------------------
});

