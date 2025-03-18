import React, { useState } from 'react'

import Bet from './Bet'

import style from './index.module.scss'

const Bets = () => {
  const [config, setConfig] = useState([
    {
      id: 1,
      action: true
    }
  ])

  const addBet = () => {
    setConfig(prev =>
      prev.some(el => el.id === 2)
        ? prev
        : prev.map(el =>
          el.id === 1 ? { ...el, action: false } : el
        ).concat({ id: 2, action: true })
    )
  }

  const removeBet = () => {
    setConfig(prev =>
      prev.length > 1
        ? prev
          .filter(el => el.id !== 2)
          .map(el =>
            el.id === 1 ? { ...el, action: true } : el
          )
        : prev
    )
  }

  return (
    <div className={style.block}>
      {
        config.map((el, idx) =>
          <Bet
            key={idx}
            config={config}
            data={el}
            action={config.length === 1 ? addBet : removeBet}
          />
        )
      }
    </div>
  )
}

export default Bets