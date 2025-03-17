import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setBets } from 'store/actions/betsAction'

import Bet from 'modules/Bet'

import style from './index.module.scss'

const MyBets = () => {
  const dispatch = useDispatch()
  const { bets } = useSelector(state => state.bets)

  useEffect(() => {
    dispatch(setBets())
  }, [])

  return (
    <div className={style.block}>
      <div className={style.body}>
        <div className={style.table}>
          <div className={style.row}>
            <div className={style.cell}>Player</div>
            <div className={style.cell}>Bet USD</div>
            <div className={style.cell}>X</div>
            <div className={style.cell}>Win USD</div>
          </div>
          {
            bets.map((el, idx) =>
              <Bet
                key={idx}
                data={el}
                type={1}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MyBets
