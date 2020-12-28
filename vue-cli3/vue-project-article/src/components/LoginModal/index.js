import Vue from "vue";
import ModalCops from "./index.vue";

const LoginModal = Vue.extend(ModalCops);

let instance;

const ModalBox = (options = {}) => {
  if (instance) {
    instance.doClose();
  }
  instance = new LoginModal({
    data: {
      show: true,
      ...options
    }
  });
  instance.ok = () => {
    return new Promise(resolve => {
      const before = options.ok ? options.ok() : false;
      if (before && before.then) {
        before.then(
          () => resolve(true),
          () => {
            console.log("reject");
          }
        );
      } else if (typeof before === "boolean" && before !== false) {
        resolve(true);
      }
    });
  };
  instance.$mount();
  document.body.appendChild(instance.$el);
  return instance;
};

ModalBox.sigin = ok => {
  return ModalBox({
    type: "sigin",
    ok
  });
};

ModalBox.register = ok => {
  return ModalBox({
    type: "register",
    ok
  });
};

ModalBox.close = () => {
  instance.doClose();
  instance.show = false;
};

export default {
  install(Vue) {
    Vue.prototype.$loginer = ModalBox;
  }
};
