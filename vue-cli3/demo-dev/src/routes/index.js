import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router);

console.log(process.env.BASE_URL);
console.log(routes);
export default new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})