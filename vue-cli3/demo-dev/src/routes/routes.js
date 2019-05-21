import AdminLayout from './../components/layout-admin/index.vue'
import TouristLayout from './../components/layout-tourist/index.vue'
import AdminIndex from './../views/admin/index.vue'
import TouristIndex from '../views/tourist/index.vue'
console.log(TouristIndex);
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
  },
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

export default routes;