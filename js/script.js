(function () {
  // Helpers:
  // // addEventListener for MediaQueryList
if (!window.matchMedia("screen").addEventListener) {
  window.matchMedia("screen").__proto__.addEventListener = function() {
    const f = arguments[1];
    this.addListener(f);
  };
}
;
  // // ========== Adaptive move ===========
// How to use:
// 1. Add "data-am" attribute to HTML-element you need.
// 2. Attribute value should be fit the pattern:
//      <targetElementSelector>/<mediaQuery>
// .......
// For example: data-am=".block1 / (min-width: 750px) and (max-width: 1000px)"
// .......
// When media query mathes the element will be moved into target block.
// Otherwise it will be putted into its common position.

const adaptiveMoveElems = document.querySelectorAll("[data-am]");
const queries = {};

for (let i = 0; i < adaptiveMoveElems.length; i++) {
  const elem = adaptiveMoveElems[i];
  const elemData = elem.dataset.am.split("/");
  const target = elemData[0].trim();
  const mediaQuery = elemData[1].trim();

  const moveData = {
    "elem": elem,
    "parent": elem.parentElement,
    "target": target,
    "prev": elem.previousElementSibling
  };

  if (queries[mediaQuery]) {
    queries[mediaQuery].push(moveData)
  } else {
    queries[mediaQuery] = [moveData];
  }
}

for (query in queries) {
  const mediaQuery = window.matchMedia(query);
  const queryData = queries[query];

  const matchMedia = function() {
    if (mediaQuery.matches) {
      for (let i = 0; i < queryData.length; i++) {
        const target = document.querySelector(queryData[i].target);
        target.appendChild(queryData[i].elem);
      }
    } else {
      for (let i = 0; i < queryData.length; i++) {
        if (queryData[i].prev) {
          queryData[i].prev.insertAdjacentElement("afterend", queryData[i].elem)
        } else {
          queryData[i].parent.appendChild(queryData[i].elem);
        }
      }
    }
  };

  matchMedia();

  mediaQuery.addEventListener("change", matchMedia);
}
;
  // //
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
;

  // Sliders
  // // Promo slider
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
;
  // //
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
;

  // Youtube Videos
  // //
class YouTubeVideo {
  constructor(elem, id) {
    this.elem = elem;
    this.id = id;

    const link = elem.querySelector(".js-youtube-btn");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      this.play();
    })
  }

  play() {
    const elem = this.elem;
    const container = this.elem.querySelector("figure");

    const iframe = document.createElement("IFRAME");
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.setAttribute("allowfullscreen", true);
    iframe.src = `https://www.youtube.com/embed/${this.id}?frameborder=0&showinfo=0`;

    elem.classList.add("_loading");

    container.append(iframe);
    iframe.onload = function() {
      elem.classList.remove("_loading");
      elem.classList.add("_play");
    }
  }
}

const youtubeVideos = Array.from(document.querySelectorAll("[data-youtube-id]"))
  .map(elem => new YouTubeVideo(elem, elem.dataset.youtubeId));
;

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
