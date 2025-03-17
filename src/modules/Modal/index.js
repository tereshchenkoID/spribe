import React from 'react'

import Icon from 'components/Icon'

import style from './index.module.scss'

const Modal = ({ children, onClose, title }) => {
  return (
    <div className={style.block}>
      <div 
        className={style.shadow} 
        onClick={onClose}
      />
      <div className={style.content}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <div className={style.title}>
              {title}
            </div>
            <button
              type={"button"}
              aria-label={'Close'}
              className={style.close}
              onClick={onClose}
            >
              <Icon iconName={'times'} />
            </button>
          </div>
          <div className={style.body}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
