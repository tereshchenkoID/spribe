import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from 'context/ModalContext'
import classNames from 'classnames'

import { setSettings } from 'store/actions/settingsAction'

import Avatar from 'modules/Avatar'

import style from './index.module.scss'

const AvatarModal = () => {
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
                style.avatar, 
                settings.avatar === avatarUrl && style.active
              )
            }
            onClick={() => handleSelect(avatarUrl)}
            title={`Avatar ${i + 1}`}
            aria-label={`Avatar ${i + 1}`}
          >
            <Avatar 
              url={avatarUrl} 
              size={'lg'}
              alt={`Avatar ${i + 1}`}
            />
          </button>
        )
      })}
    </div>
  )
}

export default AvatarModal