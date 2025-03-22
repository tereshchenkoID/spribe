import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from 'context/ModalContext'
import i18n from 'i18next'
import classNames from 'classnames'

import { setSettings } from 'store/actions/settingsAction'

import style from './index.module.scss'

const LanguageModal = () => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const { settings } = useSelector(state => state.settings)
  const { config } = useSelector(state => state.config)

  const handleSelect = (el) => {
    dispatch(setSettings({ ...settings, language: el }))
    i18n.changeLanguage(el.code)
    closeModal()
  }

  return (
    <div className={style.block}>
      {config.languages.map((el, idx) =>
        <button
          key={idx}
          type={'button'}
          className={
            classNames(
              style.button,
              settings.language.code === el.code && style.active
            )
          }
          onClick={() => handleSelect(el)}
          aria-label={`Language ${el.text}`}
          title={`Language ${el.text}`}
        >
          <span className={style.image}>
            <img
              src={`/images/countries/${el.code}.svg`}
              className={style.picture}
              alt={`Language ${el.text}`}
            />
          </span>
          <span className={style.text}>{el.text}</span>
        </button>
      )
      }
    </div>
  )
}

export default LanguageModal