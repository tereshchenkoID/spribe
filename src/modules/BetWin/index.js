import React from 'react'

import { mask } from 'helpers/mask'
import { date } from 'helpers/date'

import Odd from 'modules/Odd'
import Fairness from 'modules/Fairness'
import Avatar from 'modules/Avatar'

import style from './index.module.scss'

const BetWin = ({ data }) => {
  return (
    <div className={style.block}>
      <div className={style.top}>
        <div className={style.cell}>
          <Avatar
            url={data.avatar}
            alt={data.username}
          />
          {mask(data.username)}
        </div>
        <div className={style.cell}>
          <ul className={style.list}>
            <li className={style.item}>
              <p>Bet USD:</p>
              <p className={style.text}>{data.odds}</p>
            </li>
            <li className={style.item}>
              <p>Win USD:</p>
              <p className={style.win}>12.534</p>
            </li>
            <li className={style.item}>
              <p>Multipliers</p>
              <Odd
                color={data.color}
                odd={data.odds}
              />
            </li>
          </ul>
        </div>
        <div className={style.cell}>
          <Fairness data={data} />
        </div>
      </div>
      <div className={style.bottom}>
        <p>{date(data.created)}</p>
        <p>Round: <strong className={style.text}>{data.id}x</strong></p>
      </div>
    </div>
  )
}

export default BetWin
