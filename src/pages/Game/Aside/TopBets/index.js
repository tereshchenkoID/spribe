import React, { useState } from 'react'
import classNames from 'classnames'

import style from './index.module.scss'

import Huge from './Huge'
import Biggest from './Biggest'
import Multipliers from './Multipliers'

const TIMEFRAMES = [
  'Day',
  'Month',
  'Year'
]

const TABS = [
  'Huge wins',
  'Biggest wins',
  'Multipliers'
]

const TopBets = () => {
  const [active, setActive] = useState(0)
  const [timeframe, setTimeframe] = useState(0)

  return (
    <div className={style.block}>
      <div className={style.header}>
        <div className={style.tab}>
          {
            TABS.map((el, idx) =>
              <button
                key={idx}
                type={'button'}
                aria-label={el}
                className={
                  classNames(
                    style.link,
                    active === idx && style.active
                  )
                }
                onClick={() => setActive(idx)}
              >
                {el}
              </button>
            )
          }
        </div>
        <div className={style.tab}>
          {
            TIMEFRAMES.map((el, idx) =>
              <button
                key={idx}
                type={'button'}
                aria-label={el}
                className={
                  classNames(
                    style.link,
                    timeframe === idx && style.active
                  )
                }
                onClick={() => setTimeframe(idx)}
              >
                {el}
              </button>
            )
          }
        </div>
      </div>
      <div className={style.body}>
        {
          active === 0 &&
          <Huge />
        }
        {
          active === 1 &&
          <Biggest />
        }
        {
          active === 2 &&
          <Multipliers />
        }
      </div>
    </div>
  )
}

export default TopBets
