
//スクロールでヘッダータイトルが消える
let beforePos = 0;
let winScrollTop = 0;

window.addEventListener('scroll', function(){
    winScrollTop = this.scrollY;
    if (winScrollTop >= beforePos){
        if(winScrollTop >= 300) {
            this.document.getElementById('header__ttlbox').classList.add('is-hide');
        }
    } else {
        this.document.getElementById('header__ttlbox').classList.remove('is-hide');
    }
    beforePos = winScrollTop;
});



//ハンバーガーメニュー

const hamBtn = document.querySelector('#btn');
const gnav = document.querySelector('#gnav');
const gnavNav = document.querySelector('#gnav__nav')

const btnTop = document.querySelector('#btn__top');
const btnMiddle = document.querySelector('#btn__middle');
const btnBottom = document.querySelector('#btn__bottom');

const scrollPos = window.pageYOffset;
const bodyHeight = window.innerHeight;

hamBtn.addEventListener('click', function () {
    btnTop.classList.toggle('rotate-top');
    btnMiddle.classList.toggle('hide-middle');
    btnBottom.classList.toggle('rotate-bottom');
    gnav.classList.toggle('gnav-active');
    gnavNav.classList.toggle('gnav__nav-active');
    // document.body.classList.toggle('menu-open'); //開く前の表示位置保持とセットなので後回し いったん解除


});

gnav.addEventListener('click', function () {
    btnTop.classList.remove('rotate-top');
    btnMiddle.classList.remove('hide-middle');
    btnBottom.classList.remove('rotate-bottom');
    gnav.classList.remove('gnav-active');
    gnavNav.classList.remove('gnav__nav-active');
    // document.body.classList.remove('menu-open');

    window.scrollTo(0, scrollPos);
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


//SKILL部フィルター
const filterButtons = document.querySelectorAll('[data-filter]');
const categoryContents = document.querySelectorAll('[data-category]');

filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', buttonSwitch);
    filterButton.addEventListener('click', categoryFilter);
});

function buttonSwitch() {
    filterButtons.forEach((filterButton) => {
        filterButton.classList.remove("is-active");
        this.classList.add('is-active');
    });
}

function categoryFilter() {
    const buttonCategory = this.dataset.filter;
    const targetContents = document.querySelectorAll('[data-category="' + buttonCategory + '"]');

    categoryContents.forEach((categoryContent) => {
        categoryContent.animate([{
            opacity: 0
        },
        {
            opacity: 1
        }
        ], {
            duration: 600,
        });

        if (buttonCategory == 'all') {
            categoryContent.classList.add('is-show');
        } else {
            categoryContent.classList.remove("is-show");
            targetContents.forEach((targetContent) => {
                targetContent.classList.add('is-show');
            });
        }

    });
}