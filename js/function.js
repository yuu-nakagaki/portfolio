//ハンバーガーメニュー

const hamBtn = document.querySelector('#btn');
const gnav = document.querySelector('#gnav');
const gnavNav = document.querySelector('#gnav__nav')

const btnTop = document.querySelector('#btn__top');
const btnMiddle = document.querySelector('#btn__middle');
const btnBottom = document.querySelector('#btn__bottom');

// const headerHeight = 50;
// let bodyHeight;
// let scrollPos;

hamBtn.addEventListener('click', function () {
    btnTop.classList.toggle('rotate-top');
    btnMiddle.classList.toggle('hide-middle');
    btnBottom.classList.toggle('rotate-bottom');
    gnav.classList.toggle('gnav-active');
    gnavNav.classList.toggle('gnav__nav-active');
    document.body.classList.toggle('menu-open');

    // scrollPos = window.pageYOffset
    // document.body.style.top = scrollPos * -1 + 'px';
    // bodyHeight = window.innerHeight;
    // gnav.style.height = bodyHeight - headerHeight + 'px';
});

gnav.addEventListener('click', function () {
    btnTop.classList.remove('rotate-top');
    btnMiddle.classList.remove('hide-middle');
    btnBottom.classList.remove('rotate-bottom');
    gnav.classList.remove('gnav-active');
    gnavNav.classList.remove('gnav__nav-active');
    document.body.classList.remove('menu-open');

    // window.scrollTo(0, scrollPos)
    // gnav.style.height = 0
});


//FVぼかしエフェクト

const text = document.querySelector('.mvcover');

gsap.set(".mv__wrap", { autoAlpha: 1 }); //初期設定

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