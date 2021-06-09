// addEventListener for MediaQueryList
if (!window.matchMedia("screen").addEventListener) {
  window.matchMedia("screen").__proto__.addEventListener = (function() {
    const f = arguments[1];
    this.addListener(f);
  });
}
