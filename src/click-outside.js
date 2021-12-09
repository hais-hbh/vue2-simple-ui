const onClickDocument = (e) => {
  const { target } = e;
  callbacks.forEach((item) => {
    if (target === item.el || item.el.contains(target)) {
      return;
    } else {
      item.binding.value()
    }
  });
};
document.addEventListener("click", onClickDocument)
let callbacks = [];
export default {
  bind: function (el, binding, vnode) {
    callbacks.push({ el, binding, vnode });
    console.log(callbacks);
  },
};
const removeListener = () => {
  document.removeEventListener("click", onClickDocument);
};

export { removeListener };
