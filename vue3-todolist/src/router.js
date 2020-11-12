import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/home.vue')
  },
  {
    path: '/completed',
    name: 'Completed',
    component: () => import('./views/completed.vue')
  },
  {
    path: '/undone',
    name: 'Undone',
    component: () => import('./views/undone.vue')
  }
]

export default createRouter({
  history: createWebHistory('/'),
  linkActiveClass: 'link-active',
  routes
})