import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setBets } from 'store/actions/betsAction'

import Bet from 'modules/Bet'

import style from './index.module.scss'

const AllBets = () => {
  const dispatch = useDispatch()
  const { settings } = useSelector(state => state.settings)
  const { bets } = useSelector(state => state.bets)

  useEffect(() => {
    dispatch(setBets())
  }, [])

  return (
    <div className={style.block}>
      <div className={style.header}>
        <h6 className={style.count}>All bets: <strong>{bets.length}</strong></h6>
      </div>
      <div className={style.body}>
        <div className={style.table}>
          <div className={style.row}>
            <div className={style.cell}>Player</div>
            <div className={style.cell}>Bet, {settings.currency.currency}</div>
            <div className={style.cell}>X</div>
            <div className={style.cell}>Win, {settings.currency.currency}</div>
          </div>
          {
            bets?.map((el, idx) =>
              <Bet
                key={idx}
                data={el}
                type={0}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default AllBets
