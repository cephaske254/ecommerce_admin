import debounce from "lodash.debounce";
var prevScrollpos = window.pageYOffset;

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
    const h = document.documentElement,
      b = document.body,
      sh = "scrollHeight";

    const data = { percent: 0, increase: false };

    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos < currentScrollPos) {
      data["increase"] = true;
    } else {
      data["increase"] = false;
    }

    prevScrollpos = currentScrollPos;
    data["percent"] =
      (currentScrollPos / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    return data;
  },
};
// ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100

// const data = { position: 0, increase: false };

// var currentScrollPos = window.pageYOffset;

// if (prevScrollpos < currentScrollPos) {
//   data["increase"] = true;
// } else {
//   data["increase"] = false;
// }

// prevScrollpos = currentScrollPos;
// data["position"] = currentScrollPos;
// return data;
