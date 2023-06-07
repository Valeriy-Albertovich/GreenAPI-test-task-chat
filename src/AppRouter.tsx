import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes } from './Routes';

const AppRouter = () => (
  <Routes>
    {privateRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={Component} />
    ))}
  </Routes>
);

export default AppRouter;
