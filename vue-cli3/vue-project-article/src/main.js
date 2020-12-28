import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Modal from "./components/Modal";
import LoginModal from "./components/LoginModal";

Vue.use(Modal);
Vue.use(LoginModal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
