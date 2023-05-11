// const 変数名 = new Swiper('スライダーのクラス名', {});
// 初期化処理。Sは大文字。

const swiperMv = new Swiper('.swiper-mv', {

    // オプション
    direction: 'horizontal', //horizontal,verticalの2種類
    loop: true, //true,falseの2種類
    effect: 'slide', //slide,fade,flip,cube,coverflow,のいずれか slideかfadeが一般的
    slidesPerView: 1, //表示するスライドの枚数
    centeredSlides: true, //アクティブなスライドを画面中央にするかどうか
    spaceBetween: 100, //スライド同士の間隔
    slideActiveClass: 'swiper-mv__isActive', //アクティブなスライドにclassを追加
    speed: 2000, //スライドアニメーションの速度


    autoplay: {
        delay: 3000, //スライドが動く間隔（この記述が無いと自動で動かない）
        disableOnInteraction: false //ユーザーが操作した後も自動で動くかどうか
    }, //後続あるならここカンマ必要

    pagination: {
        el: '.swiper-mv__pagination', //ページネーションの設定をしたいHTMLのクラス名
        type: 'bullets', //見た目の種類 bullets,fraction,progressbar
        clickable: true, //クリックにより操作できるかどうか
    },

    navigation: {
        prevEl: '.swiper-mv__prev', //戻るボタン
        nextEl: '.swiper-mv__next'  //進むボタン
    },

});

const swiperItem = new Swiper('.swiper-item', {

    // オプション
    direction: 'horizontal', //horizontal,verticalの2種類
    loop: true, //true,falseの2種類
    effect: 'slide', //slide,fade,flip,cube,coverflow,のいずれか slideかfadeが一般的
    slidesPerView: 3.75, //表示するスライドの枚数
    centeredSlides: true, //アクティブなスライドを画面中央にするかどうか
    spaceBetween: 30, //スライド同士の間隔
    slideActiveClass: 'swiper-item__isActive', //アクティブなスライドにclassを追加
    speed: 1000, //スライドアニメーションの速度
    initialSlide: 2, //初期表示アイテム（0から数えて何番目か）

    navigation: {
        prevEl: '.swiper-item__prev', //戻るボタン
        nextEl: '.swiper-item__next'  //進むボタン
    },

});