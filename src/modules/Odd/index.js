import React from 'react'

import style from './index.module.scss'

const Odd = ({ odd, color }) => {
  return (
    <div
      className={style.block}
      style={{color: color}}
    >
      {odd} x
    </div>
  )
}

export default Odd
