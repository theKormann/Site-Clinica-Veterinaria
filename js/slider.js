var swiper = new Swiper(".swiper", {
    grabCursor: true,
    speed: 500,
    effect: "slide",
    loop: true,
    mousewheel: {
      invert: false,
      sensitivity: 1,
    },
    autoplay: {
      speed: 1000,
      disableOnInteraction: false, 
    },
});  