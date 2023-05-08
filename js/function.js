
//ヘッダー文字色をセクションによって変える

window.addEventListener('load', function () {
    // ヘッダー要素を取得
    const header = document.querySelector('#header__ttlbox');

    // 監視するセクションの要素を取得
    const targetSections = document.querySelectorAll('.h-change');

    // 各セクションの位置と高さを配列に格納する
    const sectionInfoList = Array.from(targetSections).map(section => {
        const sectionPosition = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        return {
            position: sectionPosition,
            height: sectionHeight
        };
    });

    // スクロールされたら実行されるコールバック関数
    const handleScroll = () => {
        // スクロール位置を取得
        const scrollPosition = window.pageYOffset;

        // 現在のスクロール位置がどのセクションに該当するかを判定する
        let activeSectionIndex = -1;
        sectionInfoList.forEach((sectionInfo, index) => {
            const { position, height } = sectionInfo;
            if (scrollPosition >= position && scrollPosition < position + height) {
                activeSectionIndex = index;
            }
        });

        // activeSectionIndex の値に応じて、ヘッダーの文字色を変更する
        if (activeSectionIndex !== -1) {
            header.classList.add('changeWhite');
        } else {
            header.classList.remove('changeWhite');
        }

    };

    // スクロールされたら handleScroll を実行するように設定する
    window.addEventListener('scroll', handleScroll);
});


//スクロールでヘッダータイトルが消える
// let beforePos = 0;
// let winScrollTop = 0;

// window.addEventListener('scroll', function () {
//     winScrollTop = this.scrollY;
//     if (winScrollTop >= beforePos) {
//         if (winScrollTop >= 300) {
//             this.document.getElementById('header__ttlbox').classList.add('is-hide');
//         }
//     } else {
//         this.document.getElementById('header__ttlbox').classList.remove('is-hide');
//     }
//     beforePos = winScrollTop;
// });


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
        // markers: true
    }
});


//横スクロール（GSAP）
const listWrapperEl = document.querySelector('#works__scroll-wrapper');
const listEl = document.querySelector('#works__scroll-list');

gsap.to(listEl, {
    x: () => -(listEl.clientWidth - listWrapperEl.clientWidth),
    ease: 'none',
    scrollTrigger: {
        trigger: '#works',
        start: 'top top',
        end: () => `+=${listEl.clientWidth - listWrapperEl.clientWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: true,
    },
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