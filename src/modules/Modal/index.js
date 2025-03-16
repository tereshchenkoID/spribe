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
              <Icon
                iconName={'times'}
                width={18}
                height={18}
              />
            </button>
          </div>
          <div className={style.body}>
            {children}
          </div>
          <div className={style.footer}>
            <button
              type={"button"}
              aria-label={'Close'}
              className={style.button}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
