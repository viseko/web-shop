(function () {
  // Раскрытие подменю каталога
  const catalogExpandBtns = document.querySelectorAll(".nav-catalog__btn-expand");
  for (expandBtn of catalogExpandBtns) {
    expandBtn.addEventListener("click", function() {
      this.parentElement.classList.toggle("nav-catalog__category-item--open");
    });
  }

})();
