import React from 'react';
import Messenger from './pages/Messenger';
import Login from './pages/Login';
import { MESSENGER_ROUTE, LOGIN_ROUTE } from './utils/consts';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
];

export const privateRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
  {
    path: MESSENGER_ROUTE,
    Component: <Messenger />,
  },
];
