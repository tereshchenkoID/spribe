import React from 'react'

import style from './index.module.scss'

const Radio = ({ data, action, name, placeholder}) => {

  return (
    <label className={style.block}>
      <input
        type="radio"
        className={style.input}
        name={name}
        value={data}
        checked={data === '1'}
        onChange={action}
      />
      <span className={style.label} />
      {
        placeholder &&
        <span className={style.placeholder}>{placeholder}</span>
      }
    </label>
  )
}

export default Radio
