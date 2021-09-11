// Promo slider
const promoSlider = new Swiper('.swiper', {
  autoplay: {
    delay: 5000
  },
  speed: 500,
  effect: "fade",
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
