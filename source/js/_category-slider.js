//

const categorySliderBreakpoint = window.matchMedia("(max-width: 450px)");

let categorySlider = null;

categorySliderBreakpoint.addEventListener("change", function() {
  if (this.matches) {
    console.log("init");
  } else {
    console.log("destroy");
  }
});


function initCategorySlider() {
  const categorySlider = new Swiper('.js-promo-slider', {
    speed: 500,
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
}


