//
const categorySliderBreakpoint = window.matchMedia("(max-width: 450px)");

let categorySlider = null;

categorySliderBreakpoint.addEventListener("change", checkCategorySliderBreakpoints);

checkCategorySliderBreakpoints();

function initCategorySlider() {
  categorySlider = new Swiper(".js-catalog-slider", {
    speed: 500,

    pagination: {
      el: ".index-catalog__pagination",
      bulletClass: "slider__bullet",
      bulletActiveClass: "slider__bullet--active",
      clickable: true,
      clickableClass: "slider__pagination--clickable",
      currentClass: "slider__pagination--current",
      horizontalClass: "slider__pagination--horizontal",
      modifierClass: "slider__pagination--"
    },

    navigation: {
      prevEl: ".js-catalog-prev",
      nextEl: ".js-catalog-next"
    }
  });
}

function checkCategorySliderBreakpoints() {
  if (categorySliderBreakpoint.matches) {
    initCategorySlider()
  } else if (!categorySliderBreakpoint.matches && categorySlider) {
    categorySlider.destroy();
  }
}
