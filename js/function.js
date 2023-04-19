//ハンバーガーメニュー

const hamBtn = document.querySelector('#btn');
const gnav = document.querySelector('#gnav');

const btnTop = document.querySelector('#btn__top');
const btnMiddle = document.querySelector('#btn__middle');
const btnBottom = document.querySelector('#btn__bottom');

hamBtn.addEventListener('click', function(){
    btnTop.classList.toggle('rotate-top');
    btnMiddle.classList.toggle('hide-middle');
    btnBottom.classList.toggle('rotate-bottom');
    gnav.classList.toggle('gnav-active');
});

gnav.addEventListener('click', function(){
    gnav.classList.remove('gnav-active');
});


//FVぼかしエフェクト

const text = document.querySelector('.mvcover');

//初期状態
gsap.set(".mv__wrap", { autoAlpha: 1 });

//スクロールをトリガーに、以下
gsap.to(".mv__wrap", {
    autoAlpha: 0,
    textShadowBlur: 20,
    scrollTrigger: {
        trigger: text,
        start: 'top 20%',
        end: 'bottom 80%',
        opacity: 0,
        scrub: true,
        markers: true
    }
});