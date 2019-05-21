import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import TouristLayout from './../components/layout-tourist/index.vue'
import TouristIndex from '../views/tourist/home.vue'
console.log(TouristIndex);
const routes = [
  {
    path: '/tourist',
    name: 'tourist',
    component: TouristLayout,
    redirect: {
      name: 'page'
    },
    children: [
      {
        name: 'page',
        path: '/index',
        component: TouristIndex
      }
    ]
  }
];

export default new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})