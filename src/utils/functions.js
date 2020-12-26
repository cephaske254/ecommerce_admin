export function trimText(str, max = 80, dots = true) {
  if (str.length > max) {
    str = str.substring(0, max);
    if (dots) str = str + "...";
  }
  return str;
}
