import Toast from "./toast.vue";
const createToast = ({ Vue, message, propsData }) => {
  const Constructor = Vue.extend(Toast);
  const toast = new Constructor({
    propsData,
  });
  toast.$slots.default = [message];
  toast.$mount();
  document.body.appendChild(toast.$el);
  return toast;
};

let currentToast;

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function (message, toastOptions) {
      currentToast && currentToast.close();
      currentToast = createToast({ Vue, message, propsData: toastOptions });
    };
  },
};
