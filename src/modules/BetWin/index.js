import React from 'react'
import { useSelector } from 'react-redux'

import { mask } from 'helpers/mask'
import { date } from 'helpers/date'

import Odd from 'modules/Odd'
import Fairness from 'modules/Fairness'
import Avatar from 'modules/Avatar'

import style from './index.module.scss'

const BetWin = ({ data }) => {
  const { settings } = useSelector(state => state.settings)

  return (
    <div className={style.block}>
      <div className={style.cell}>
        <Avatar
          url={data.avatar}
          alt={data.username}
          size={'md'}
        />
        <div className={style.info}>
          <p className={style.text}>{mask(data.username)}</p>
          <p>{date(data.created, 0)}</p>
        </div>
      </div>
      <div className={style.cell}>
        <Fairness
          data={data}
          size={'lg'}
        />
      </div>
      <div className={style.cell}>
        <ul className={style.list}>
          <li className={style.item}>
            <p>Bet, {settings.currency.currency}:</p>
            <p className={style.text}>{data.odds}</p>
          </li>
          <li className={style.item}>
            <p>Win, {settings.currency.currency}:</p>
            <p className={style.text}>12.534</p>
          </li>
        </ul>
      </div>
      <div className={style.cell}>
        <ul className={style.list}>
          <li className={style.item}>
            <p>Round:</p>
            <p className={style.text}>{data.id}</p>
          </li>
          <li className={style.item}>
            <p>Multipliers:</p>
            <Odd
              color={data.color}
              odd={data.odds}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BetWin
