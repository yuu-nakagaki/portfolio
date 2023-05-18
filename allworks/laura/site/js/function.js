
const hamBtn = document.querySelector('#btn');
const gnav = document.querySelector('#gnav');
const gnavNav = document.querySelector('#gnav__nav')
const gnavLink = document.querySelector('#gnav__link')

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

gnavLink.addEventListener('click', function () {
    btnTop.classList.remove('rotate-top');
    btnMiddle.classList.remove('hide-middle');
    btnBottom.classList.remove('rotate-bottom');
    gnav.classList.remove('gnav-active');
    gnavNav.classList.remove('gnav__nav-active');
    window.scrollTo(0, scrollPos);
});

//画像・テキストフェードイン

const windowHeight = window.innerHeight;
window.addEventListener('scroll',function(){
    const ST = window.pageYOffset;
    const fadeElements = document.querySelectorAll('.fadeIn');
    fadeElements.forEach(function(element){
        const target = element.getBoundingClientRect().top + window.pageYOffset;
        if (ST > target - windowHeight / 2) {
            element.classList.add('showElement');
        }
    });

    const blurElements = document.querySelectorAll('.blurTarget');
    blurElements.forEach(function(element){
        const target = element.getBoundingClientRect().top + window.pageYOffset;
        if (ST > target - windowHeight) {
            element.classList.add('blur');
        }
    });

});
