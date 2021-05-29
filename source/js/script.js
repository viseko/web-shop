(function () {
  // Глобальные состояния
  let mainMenuOpen = false;

  // Мобильное меню навигации

  // Мобильное меню каталога
  document.querySelector(".js-menu-nav").addEventListener("click", function() {
    if (!mainMenuOpen) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  });

  function openMobileMenu() {
    document.body.classList.add("_menu-show");
    mainMenuOpen = true;
  }

  function closeMobileMenu() {
    document.body.classList.remove("_menu-show");
    mainMenuOpen = false;
  }

  window.addEventListener("resize", function() {
    if (window.innerWidth > 875 && mainMenuOpen) closeMobileMenu();
  });

  // Раскрытие подменю каталога
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
