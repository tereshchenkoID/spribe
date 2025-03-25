import React from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Odd = ({ odd, color, size = 'sm' }) => {
  return (
    <div
      className={
        classNames(
          style.block,
          style[size]
        )
      }
      style={{color: color}}
    >
      {odd}x
    </div>
  )
}

export default Odd
