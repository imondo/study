import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

import Layout from 'components/Layout/layout'

const routes = [
  {
    path: "*",
    redirect: {name: 'index'}
  },
  {
    path: '/',
    component: Layout,
    redirect: {name: 'index'},
    children: [
      {path: 'index', name: 'index', component: resolve => require(['views/index/index'], resolve)},
      {path: 'demo', name: 'demo', component: resolve => require(['views/demo/index'], resolve)},
      {path: 'login', name: 'login', component: resolve => require(['views/login/index'], resolve)},
      {path: 'users', name: 'users', component: resolve => require(['views/user/index'], resolve), meta: {auth: true}}
    ]
  }
];

export default new Router({
  mode: 'history',
  base: '/' + process.env.PUBLICPATH + '/',
  routes,
  linkActiveClass: 'link-active'
});