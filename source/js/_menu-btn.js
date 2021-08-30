//
function setMenuButton(options) {
  const btnClass = options.btn;
  const stateBodyClass = options.stateBodyClass;
  const mediaWhenMenuClose = options.mediaWhenMenuClose;
  const btn = document.querySelector(`.${btnClass}`)

  let menuOpen = false;

  btn.addEventListener("click", function() {
    if (!menuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  const media = window.matchMedia(mediaWhenMenuClose);
  media.addEventListener("change", function() {
    if (!this.matches && menuOpen) closeMenu();
  });

  function openMenu() {
    document.body.classList.add(stateBodyClass);
    btn.classList.add("_open");
    menuOpen = true;
  }

  function closeMenu() {
    document.body.classList.remove(stateBodyClass);
    btn.classList.remove("_open");
    menuOpen = false;
  }

  return {
    close: closeMenu,
    open: openMenu,
    isOpen: function() {
      return menuOpen;
    }
  };
}
