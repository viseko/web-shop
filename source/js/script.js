(function () {
  // Раскрытие подменю каталога
  const catalogExpandBtns = document.querySelectorAll(".nav-catalog__btn-expand");
  for (expandBtn of catalogExpandBtns) {
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
