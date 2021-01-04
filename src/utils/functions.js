export function trimText(str, max = 80, dots = true) {
  if (str.length > max) {
    str = str.substring(0, max);
    if (dots) str = str + "...";
  }
  return str;
}

export function _(el) {
  if (!(this instanceof _)) {
    return new _(el);
  }
  this.el = document.getElementById(el);
}

_.prototype.fade = function(type, ms = 500) {
  let isIn = type === "in",
    opacity = isIn ? 0 : 1,
    duration = ms,
    interval = 50,
    gap = interval / duration,
    self = this;

  if (isIn) {
    self.el.style.display = "inline";
    self.el.style.opacity = opacity;
  }

  function func() {
    opacity = isIn ? opacity + gap : opacity - gap;
    self.el.style.opacity = opacity;

    if (opacity <= 0) self.el.style.display = "none";
    if (opacity <= 0 || opacity >= 1) {
      window.clearInterval(fading);
    }
  }
  var fading = window.setInterval(func, interval);
};
