import React from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Loader = () => {
  return (
    <div className={classNames(style.block)}>
      <div className={style.spin} />
    </div>
  )
}

export default Loader
