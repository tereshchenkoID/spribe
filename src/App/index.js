import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ModalProvider } from 'context/ModalContext'

import { routes } from 'routes'

import Toastify from 'components/Toastify'
import Loader from 'components/Loader'

import style from './index.module.scss'

const App = () => {
  return (
    <div className={style.block}>
      <ModalProvider>
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </Router>
      </ModalProvider>
      <Toastify />
    </div>
  )
}

export default App
