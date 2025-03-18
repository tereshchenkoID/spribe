import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from 'context/ModalContext'
import classNames from 'classnames'

import { setSettings } from 'store/actions/settingsAction'

import style from './index.module.scss'

const LanguageModal = () => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const { settings } = useSelector(state => state.settings)
  
  const handleSelect = (url) => {
    dispatch(setSettings({ ...settings, avatar: url }))
    closeModal()
  }

  return (
    <div className={style.block}>
      {Array.from({ length: 72 }, (_, i) => {
        const avatarUrl = `https://aviator-demo.spribegaming.com/assets/static/avatars/v2/av-${i + 1}.png?v=4.1.1`

        return (
          <button
            key={i}
            type={'button'}
            className={
              classNames(
                style.button, 
                settings.avatar === avatarUrl && style.active
              )
            }
            onClick={() => handleSelect(avatarUrl)}
            aria-label={`Language ${i + 1}`}
            title={`Language ${i + 1}`}
          >
            <span className={style.image}>
              <img 
                src={avatarUrl} 
                className={style.img} 
                alt={`Language ${i + 1}`} 
              />
            </span>
            <span className={style.text}>Language text</span>
          </button>
        )
      })}
    </div>
  )
}

export default LanguageModal