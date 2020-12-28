import debounce from "lodash.debounce";

export default {
  currentPage: (page, title = false) => {
    try {
      const element = document.getElementById("current-page");
      element.innerHTML = page.toUpperCase();
      if (title) document.title = title;
    } catch {}
  },
  hideNav: () => {
    document.getElementsByTagName("html")[0].classList.remove("nav-open");
  },
  debounce: function(func, delay) {
    debounce(function() {
      func();
    }, delay)();
  },
  scrollPercentage: function() {
    var h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";
    return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
  },
};
