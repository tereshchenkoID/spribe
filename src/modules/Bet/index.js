import React from 'react'
import classNames from 'classnames'

import { mask } from 'helpers/mask'
import { date } from 'helpers/date'

import Odd from 'modules/Odd'
import Fairness from 'modules/Fairness'

import style from './index.module.scss'

const Bet = ({ data, type }) => {
  return (
    <div
      className={
        classNames(
          style.block,
          data.win && style.win
        )
      }
    >
      <div className={style.cell}>
        {
          type === 0 &&
          <>
            <div className={style.avatar}>
              <img
                src={data.avatar}
                alt={data.username}
              />
            </div>
            <p>{mask(data.username)}</p>
          </>
        }
        {
          type === 1 &&
          <p>{date(data.created)}</p>
        }
      </div>
      <div className={style.cell}>
        <p className={style.stake}>{data.stake}</p>
      </div>
      <div className={style.cell}>
        <Odd
          color={data.color}
          odd={data.odds}
        />
      </div>
      <div className={style.cell}>
        {
          type === 1 &&
          <>
            {
              data.cashed &&
              <p className={style.cashed}>{data.cashed}</p>
            }
            <Fairness data={data} />
          </>
        }
      </div>
    </div>
  )
}

export default Bet
