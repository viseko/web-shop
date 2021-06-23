//
function setMenuButton(options) {
  const btnClass = options.btn;
  const stateBodyClass = options.stateBodyClass;
  const mediaWhenMenuClose = options.mediaWhenMenuClose;

  let menuOpen = false;

  document.querySelector(`.${btnClass}`).addEventListener("click", function() {
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
    menuOpen = true;
  }

  function closeMenu() {
    document.body.classList.remove(stateBodyClass);
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
