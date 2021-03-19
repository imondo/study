import { render, h } from "vue";
import ModalCops from "./index.vue";

let instance;

const ModalBox = ({type, ok}) => {
  if (instance) {
    instance.component.proxy.doClose();
  }

  let _opt = {
    visible: true,
    type,
    close: () => {
      return new Promise(resolve => {
        const before = ok ? ok() : false;

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
    }
  };

  instance = h(ModalCops, _opt);

  const container = document.createElement('div');

  instance.props.onDestroy = () => {
    render(null, container);
  }

  render(instance, container);
  
  document.body.appendChild(container.firstElementChild);

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
  instance.component.proxy.doClose();
  instance.component.proxy.show = false;
};

export default {
  install(app) {
    console.log(app)
    app.config.globalProperties.$loginer = ModalBox;
  }
};
