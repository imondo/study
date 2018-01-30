import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import iMondo from './components/index';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/axios';
import store from './store/index';
import handleToken from './utils/token';
import { utils } from './utils/index'; // 导入公用方法
import './styles/font-awesome.less';
import './styles/common';

console.log(process.env);
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(iMondo);

// 多个方法可以给Vue原型
Vue.prototype.$axios = axios;
Vue.prototype.$utils = utils;

// 路由钩子
router.beforeEach(({ meta }, from, next) => {
  store.dispatch('getToken').then(token => {
    if (meta.auth) {
      token ? next() : next({name: 'login'})
    } else {
      next();
    }
  })
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
