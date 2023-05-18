const swiperMv = new Swiper('.swiper-mv', {

    direction: 'horizontal', 
    loop: true, 
    effect: 'slide', 
    slidesPerView: 1, 
    centeredSlides: true, 
    spaceBetween: 100, 
    slideActiveClass: 'swiper-mv__isActive',
    speed: 2000, 


    autoplay: {
        delay: 3000, 
        disableOnInteraction: false,
    },

    pagination: {
        el: '.swiper-mv__pagination',
        type: 'bullets', 
        clickable: true, 
    },

    navigation: {
        prevEl: '.swiper-mv__prev',
        nextEl: '.swiper-mv__next'
    },
});

const swiperItem = new Swiper('.swiper-item', {

    direction: 'horizontal',
    loop: true, 
    effect: 'slide', 
    slidesPerView: 3.75, 
    centeredSlides: true,
    spaceBetween: 30,
    slideActiveClass: 'swiper-item__isActive',
    speed: 1000,
    initialSlide: 2, 

    navigation: {
        prevEl: '.swiper-item__prev',
        nextEl: '.swiper-item__next' 
    },

});