(function () {
  // Helpers:
  // @@include("_ie-fix.js");
  // @@include("_adaptive-move.js");
  // @@include("_menu-btn.js");

  // Sliders
  // @@include("_promo-slider.js");
  // @@include("_category-slider.js");

  // Youtube Videos
  // @@include("_youtube-video.js");

  // Disabling empty links
  document.querySelectorAll('[href="#"]').forEach(link => link.addEventListener("click", function(e) {e.preventDefault()}));

  // Navigation mobile menu
  const menuBtn = setMenuButton({
    btn: "js-menu-nav",
    stateBodyClass: "_menu-show",
    mediaWhenMenuClose: "(max-width: 875px)"
  });

  // Catalog mobile menu
  const catalogBtn = setMenuButton({
    btn: "js-menu-catalog",
    stateBodyClass: "_catalog-show",
    mediaWhenMenuClose: "(max-width: 875px)"
  });

  // Catalog submenues
  const catalogExpandBtns = document.querySelectorAll(".nav-catalog__btn-expand");
  for (let i = 0; i < catalogExpandBtns.length; i++) {
    expandBtn = catalogExpandBtns[i];

    expandBtn.addEventListener("click", function() {
      const openClass = "nav-catalog__category-item--open";
      const alreadyOpened = document.querySelector(`.${openClass}`);

      if (alreadyOpened && alreadyOpened != this.parentElement) {
        alreadyOpened.classList.remove(openClass);
      }

      this.parentElement.classList.toggle(openClass);
    });
  }
})();
