import Vue from "vue";
import ModalCops from "./index.vue";

const Modal = Vue.extend(ModalCops);

let instance;

const ModalBox = (options = {}) => {
  instance = new Modal({
    data: {
      show: true,
      ...options
    }
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  return instance;
};

ModalBox.alert = (msg, title = "提示") => {
  return ModalBox({
    type: "alert",
    content: msg,
    title
  });
};

ModalBox.close = () => {
  instance.doClose();
  instance.show = false;
};

export default {
  install(Vue) {
    Vue.prototype.$modal = ModalBox;
  }
};
