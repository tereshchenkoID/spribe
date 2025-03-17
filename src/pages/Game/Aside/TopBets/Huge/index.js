import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setBets } from 'store/actions/betsAction'

import BetWin from 'modules/BetWin'

import style from './index.module.scss'

const Huge = () => {
  const dispatch = useDispatch()
  const { bets } = useSelector(state => state.bets)

  useEffect(() => {
    dispatch(setBets())
  }, [])

  return (
    <div className={style.block}>
      <div className={style.table}>
        {
          bets?.map((el, idx) =>
            <BetWin 
              key={idx}
              data={el}
            />
          )
        }
      </div>
    </div>
  )
}

export default Huge
