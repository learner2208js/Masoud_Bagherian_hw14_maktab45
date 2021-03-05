function slideDown(el, style = {}) {
  const body = el.children[0];
  const height = body.offsetHeight;
  el.style.height = `${height}px`;
  for (const prop in style) {
    el.style[prop] = style[prop];
  }
}
function slideUp(el, style) {
  el.style.height = '0';
  for (const prop in style) {
    el.style[prop] = style[prop];
  }
}
