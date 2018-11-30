import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter);

console.log(process.env.BASE_URL);

export default new VueRouter({
  routes,
  base: 'demo'
})