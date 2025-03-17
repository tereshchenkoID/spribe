import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import { getData } from 'helpers/api'

import Icon from 'components/Icon'
import Odd from 'modules/Odd'

import style from './index.module.scss'

const History = () => {
  const [data, setData] = useState(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    getData('history').then(json => {
      setData(json)
    })
  }, [])

  if (!data)
    return

  console.log(data)

  return (
    <div className={style.block}>
      <div className={style.list}>
        {
          data.map((el, idx) =>
            <div
              key={idx}
              className={style.item}
            >
              <Odd
                odd={el.odds}
                color={el.color}
              />
            </div>
          )
        }
      </div>
      <button
        type={'button'}
        className={
          classNames(
            style.full,
            active && style.active
          )
        }
        aria-label={'Show history'}
        title={'Show history'}
        onClick={() => setActive(!active)}
      >
        <Icon
          iconName={'history'}
          width={17}
          height={15}
        />
        <span>Show</span>
      </button>
    </div>
  )
}

export default History
