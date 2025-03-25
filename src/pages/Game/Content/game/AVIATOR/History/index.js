import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setBets } from 'store/actions/betsAction'

import Odd from 'modules/Odd'

import style from './index.module.scss'

const History = () => {
  const dispatch = useDispatch()
  const { bets } = useSelector(state => state.bets)

  useEffect(() => {
    dispatch(setBets())
  }, [])

  return (
    <div className={style.block}>
      <p className={style.head}>Round history</p>
      <div className={style.scroll}>
        <div className={style.list}>
          {
            bets.map((el, idx) =>
              <Odd
                key={idx}
                color={el.color}
                odd={el.odds}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default History