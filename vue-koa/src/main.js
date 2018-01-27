import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import iMondo from './components/index';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/axios';
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

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
