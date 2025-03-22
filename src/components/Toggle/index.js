import React from 'react'

import style from './index.module.scss'

const Toggle = ({ data, action, placeholder }) => {

  return (
    <label className={style.block}>
      <input
        type="checkbox"
        className={style.input}
        onChange={action}
        checked={data === '1'}
      />
      <span className={style.label} />
      <span className={style.placeholder}>{placeholder}</span>
    </label>
  )
}

export default Toggle
