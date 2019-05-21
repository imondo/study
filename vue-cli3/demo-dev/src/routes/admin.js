import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import AdminLayout from './../components/layout-admin/index.vue'
import AdminIndex from './../views/admin/home.vue'

const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    redirect: {
      name: 'home'
    },
    children: [
      {
        name: 'home',
        path: '/index',
        component: AdminIndex
      }
    ]
  }
];

export default new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})