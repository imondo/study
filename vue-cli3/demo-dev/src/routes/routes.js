import AdminLayout from './../components/layout-admin'
import TouristLayout from './../components/layout-tourist'

const loadViews = view => {
  return () => import(`./../${view}`);
};

const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    redirect: {
      name: 'index'
    },
    children: [
      {
        name: 'index',
        path: 'index',
        component: loadViews('views/admin/index.vue')
      }
    ]
  },
  {
    path: '/tourist',
    component: TouristLayout,
    redirect: {
      name: 'index'
    },
    children: [
      {
        name: 'index',
        path: 'index',
        component: loadViews('views/tourist/index.vue')
      }
    ]
  }
];

export default routes;