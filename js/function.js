
//ヘッダー文字色をセクション毎に変更（トップページのみ）
window.addEventListener('load', function () {
    // トップページでのみ実行
    if (document.body.id === 'top') {
        const header = document.querySelector('#header__ttlbox');
        const worksSection = document.querySelector('#works');
        const looptxtSection = document.querySelector('#looptxt');
        const skillSection = document.querySelector('#skill');
        const profileSection = document.querySelector('#profile');
        const contactSection = document.querySelector('#contact');
        const footerSection = document.querySelector('#footer');

        // 要素が存在する場合のみ実行
        if (worksSection && looptxtSection && skillSection && profileSection && contactSection && footerSection) {
            const worksPosition = worksSection.getBoundingClientRect().top + window.pageYOffset;
            const looptxtPosition = looptxtSection.getBoundingClientRect().top + window.pageYOffset;
            const skillPosition = skillSection.getBoundingClientRect().top + window.pageYOffset;
            const profilePosition = profileSection.getBoundingClientRect().top + window.pageYOffset;
            const contactPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
            const footerPosition = footerSection.getBoundingClientRect().top + window.pageYOffset;

            const handleScroll = () => {
                const scrollPosition = window.pageYOffset;
                if (scrollPosition >= worksPosition && scrollPosition < looptxtPosition) {
                    header.classList.add('changeWhite');
                } else if (scrollPosition >= looptxtPosition && scrollPosition < skillPosition) {
                    header.classList.remove('changeWhite');
                } else if (scrollPosition >= skillPosition && scrollPosition < profilePosition) {
                    header.classList.add('changeWhite');
                } else if (scrollPosition >= profilePosition && scrollPosition < contactPosition) {
                    header.classList.remove('changeWhite');
                } else if (scrollPosition >= contactPosition && scrollPosition < footerPosition) {
                    header.classList.add('changeWhite');
                } else {
                    header.classList.remove('changeWhite');
                }
            };
            window.addEventListener('scroll', handleScroll);
        }
    }
});

//ヘッダー文字色を変更（下層ページ）
window.addEventListener('load', function () {
    // allworksページ以外の下層ページでのみ実行
    if (document.body.id !== 'top' && document.body.id !== 'allworks') {
        const header = document.querySelector('#header__ttlbox');
        const captionSection = document.querySelector('#caption');
        const descriptionSection = document.querySelector('#description');

        // 要素が存在する場合のみ実行
        if (captionSection && descriptionSection) {
            const captionPosition = captionSection.getBoundingClientRect().top + window.pageYOffset;
            const descriptionPosition = descriptionSection.getBoundingClientRect().top + window.pageYOffset;

            const handleScroll = () => {
                const scrollPosition = window.pageYOffset;
                if (scrollPosition >= captionPosition && scrollPosition < descriptionPosition) {
                    header.classList.add('changeWhite');
                } else {
                    header.classList.remove('changeWhite');
                }
            };
            window.addEventListener('scroll', handleScroll);
        }
    }
});

let beforePosition = 0;
let winScrollTop = 0;

window.addEventListener('scroll', function () {
    winScrollTop = this.scrollY;
    if (winScrollTop >= beforePosition) {
        if (winScrollTop >= 300) {
            this.document.getElementById('header__ttlbox').classList.add('is-hide');
        }
    } else {
        this.document.getElementById('header__ttlbox').classList.remove('is-hide');
    }
    beforePosition = winScrollTop;
});

//ハンバーガーメニュー
const hamBtn = document.querySelector('#btn');
const gnav = document.querySelector('#gnav');
const gnavNav = document.querySelector('#gnav__nav');
const gnavLinks = document.querySelectorAll('.gnav__link');

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
});

gnavLinks.forEach((gnavLink) => {
    gnavLink.addEventListener('click', function(){
        btnTop.classList.remove('rotate-top');
        btnMiddle.classList.remove('hide-middle');
        btnBottom.classList.remove('rotate-bottom');
        gnav.classList.remove('gnav-active');
        gnavNav.classList.remove('gnav__nav-active');
        window.scrollTo(0, scrollPos);
    });
});

//FVぼかしエフェクト（トップページのみ）
if (document.body.id === 'top') {
    const text = document.querySelector('.mvcover');
    const mvWrap = document.querySelector('.mv__wrap');
    
    if (text && mvWrap && typeof gsap !== 'undefined') {
        gsap.set(".mv__wrap", { autoAlpha: 1 });
        gsap.to(".mv__wrap", {
            autoAlpha: 0,
            textShadowBlur: 20,
            scrollTrigger: {
                trigger: text,
                start: 'top 20%',
                end: 'bottom 80%',
                opacity: 0,
                scrub: true,
            }
        });
    }

    //徐々に出現するテキスト（トップページのみ）
    if (typeof gsap !== 'undefined') {
        gsap.utils.toArray('.mvcover__txt').forEach((target) => {
            gsap.to(target, {
                backgroundPosition: '0% 0%', duration: 3.5, scrollTrigger: {
                    trigger: target,
                    start: 'bottom bottom',
                    toggleActions: 'play none none reverse'
                }
            })
        })
    }
}

//横スクロール（トップページのみ）
if (document.body.id === 'top') {
    const listWrapperEl = document.querySelector('#works__scroll-wrapper');
    const listEl = document.querySelector('#works__scroll-list');

    if (listWrapperEl && listEl && typeof gsap !== 'undefined') {
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
                // markers: true,
            },
        });
    }
}

//SKILL部フィルター（トップページのみ）
if (document.body.id === 'top') {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const categoryContents = document.querySelectorAll('[data-category]');

    if (filterButtons.length > 0 && categoryContents.length > 0) {
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
    }
}

//message部演出（トップページのみ）
if (document.body.id === 'top') {
    const messageBg = document.querySelector('.message__bg');
    const message = document.querySelector('.message');
    
    if (messageBg && message && typeof gsap !== 'undefined') {
        gsap.to(".message__bg", 1, {
            ease: 'power2.easeOut',
            scale: 20,
            scrollTrigger: {
                trigger: '.message',
                start: 'top 60%',
                end: 'top 60%',
                opacity: 0,
            }
        });
    }
}

//ALLWORKS ページ - 制作実績アイテムのスクロールアニメーション
window.addEventListener('load', function() {
    if (document.body.id === 'allworks') {
        // GSAP読み込み確認
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded!');
            return;
        }
        
        const catalogBoxes = document.querySelectorAll('.catalog__box');
        
        catalogBoxes.forEach((box, index) => {
            // 3番目以降の要素をアニメーション対象にする（シンプルな条件）
            if (index >= 2) {
                box.classList.add('animate-item');
                
                gsap.to(box, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: (index - 2) * 0.1, // 3番目から順次表示
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 85%',
                        once: true,
                    }
                });
            }
        });
    }
});