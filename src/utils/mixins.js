import debounce from "lodash.debounce";
var prevScrollpos = window.pageYOffset;

const price = (value) => {
  value = parseFloat(value).toFixed(2);
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default {
  currentPage: (page) => {
    document.title = `${process.env.VUE_APP_SITE_TITLE} | ${page}`;
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
  usd(value) {
    const data = price(value);
    return "$" + data;
  },
};
