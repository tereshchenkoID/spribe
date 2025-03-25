import React, { useState } from 'react'
import classNames from 'classnames'

import Icon from 'components/Icon'
import Odd from 'modules/Odd'
import History from './History'

import style from './index.module.scss'

const AVIATOR = () => {
  const [active, setActive] = useState(false)

  return (
    <div className={style.block}>
      <div className={style.head}>
        <div className={style.history}>
          {Array.from({ length: 41 }, (_, i) =>
            <Odd
              key={i}
              color={'#f00'}
              odd={(i + 1).toFixed(2)}
            />
          )}
        </div>
        <button
          type={'button'}
          className={
            classNames(
              style.toggle,
              active && style.active
            )
          }
          title={'Show history'}
          aria-label={'Show history'}
          onClick={() => setActive(!active)}
        >
          <Icon
            iconName={active ? 'times' : 'history'}
            width={32}
            height={32}
          />
        </button>
        {
          active &&
          <History />
        }
      </div>
      AVIATOR
    </div>
  )
}

export default AVIATOR