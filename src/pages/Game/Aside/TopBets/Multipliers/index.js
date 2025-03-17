import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setBets } from 'store/actions/betsAction'
import { date } from 'helpers/date'

import Odd from 'modules/Odd'
import Fairness from 'modules/Fairness'

import style from './index.module.scss'

const Multipliers = () => {
  const dispatch = useDispatch()
  const { bets } = useSelector(state => state.bets)

  useEffect(() => {
    dispatch(setBets())
  }, [])

  return (
    <div className={style.block}>
      <div className={style.table}>
        <div className={style.row}>
          <div className={style.cell}>Date & time</div>
          <div className={style.cell}>X</div>
          <div className={style.cell} />
        </div>
        {
          bets?.map((el, idx) =>
            <div
              key={idx}
              className={style.row}
            >
              <div className={style.cell}>{date(el.created)}</div>
              <div className={style.cell}>
                <Odd
                  color={el.color}
                  odd={el.odds}
                />
              </div>
              <div className={style.cell}>
                <Fairness data={el} />
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Multipliers
