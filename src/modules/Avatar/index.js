import React from 'react'

import classNames from 'classnames'

import style from './index.module.scss'

const Avatar = ({ url, alt = 'Avatar', size = 'sm' }) => {
  return (
    <div
      className={
        classNames(
          style.block,
          style[size]
        )
      }
    >
      <img
        src={url}
        alt={alt}
      />
    </div>
  )
}

export default Avatar
