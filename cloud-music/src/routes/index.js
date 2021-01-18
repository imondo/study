import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Rank from '../pages/Rank';
import Recommend from '../pages/Recommend';
import Singers from '../pages/Singers';
import Album from '../pages/Album';
import Singer from '../pages/Singer';

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={Recommend} />
      },
      {
        path: '/recommend/',
        component: Recommend,
        routes: [
          {
            path: '/recommend/:id',
            component: Album
          }
        ]
      },
      {
        path: '/singers',
        component: Singers,
        routes: [
          {
            path: '/singers/:id',
            component: Singer
          }
        ]
      },
      {
        path: '/rank',
        component: Rank,
        routes: [
          {
            path: '/rank/:id',
            component: Album
          }
        ]
      }
    ]
  }
];
