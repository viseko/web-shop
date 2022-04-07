// Promo slider
const promoSlider = new Swiper('.js-promo-slider', {
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  speed: 500,
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  freeMode: false,
  loop: true,
  autoHeight: true,

  pagination: {
    el: ".promo__pagination",
    bulletClass: "slider__bullet",
    bulletActiveClass: "slider__bullet--active",
    clickable: true,
    clickableClass: "slider__pagination--clickable",
    currentClass: "slider__pagination--current",
    horizontalClass: "slider__pagination--horizontal",
    modifierClass: "slider__pagination--"
  },

  navigation: {
    prevEl: ".js-promo-prev",
    nextEl: ".js-promo-next"
  }
});
