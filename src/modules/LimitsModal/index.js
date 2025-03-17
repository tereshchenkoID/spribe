import React from 'react'
import { useSelector } from 'react-redux'

import style from './index.module.scss'

const LimitsModal = () => {
  const { settings } = useSelector(state => state.settings)

  return (
    <div className={style.block}>
      <p className={style.subtitle}>The game limits are managed by the operator, and the current game limits for this game are as follows:</p>
      <div className={style.wrapper}>
        <div className={style.row}>
          <p className={style.label}>Min. bet {settings.currency.currency}</p>
          <p className={style.text}>{settings.betting.minBet}</p>
        </div>
        <div className={style.row}>
          <p className={style.label}>Max. bet {settings.currency.currency}</p>
          <p className={style.text}>{settings.betting.maxBet}</p>
        </div>
      </div>
    </div>
  )
}

export default LimitsModal