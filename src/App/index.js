import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ModalProvider } from 'context/ModalContext';

import { routes } from 'routes';

import style from './index.module.scss';

const App = () => {
  return (
    <div className={style.block}>
      <ModalProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </Router>
      </ModalProvider>
    </div>
  );
}

export default App;
