import React, { Suspense, lazy } from "react"
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Loader from 'components/Loader'
import Bets from './Bets'

import style from './index.module.scss'

const loadGameModule = id => {
  switch (id) {
    case '1':
      return lazy(() => import("./game/TRADER"))
    case '2':
      return lazy(() => import("./game/AVIATOR"))
    default:
      return lazy(() => import("./game/TRADER"))
  }
}

const Content = () => {
  const { game } = useSelector(state => state.game)
  const { t } = useTranslation()
  const GameComponent = loadGameModule(game.id)

  return (
    <div className={style.block}>
      {t('currency')}
      <div className={style.content}>
        <Suspense 
          fallback={
            <Loader />
          }
        >
          <GameComponent />
        </Suspense>
      </div>
      <Bets />
    </div>
  )
}

export default Content
