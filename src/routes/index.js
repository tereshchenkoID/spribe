import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const Game = lazy(() => import('pages/Game'));

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/game/:name',
    element: <Game />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];