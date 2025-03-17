import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from 'context/ModalContext'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { setSettings } from 'store/actions/settingsAction'
import { mask } from 'helpers/mask'
import { getData } from 'helpers/api'

import Icon from 'components/Icon'
import Toggle from 'components/Toggle'
import Avatar from 'modules/Avatar'
import AvatarModal from 'modules/AvatarModal'

import style from './index.module.scss'

const Nav = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const { game } = useSelector(state => state.game)
  const { settings } = useSelector(state => state.settings)
  const [active, setActive] = useState(false)

  const OPTIONS = {
    sound: {
      text: 'Sound',
      icon: 'sound',
      size: [15, 16],
      data: settings.settings.sound
    },
    music: {
      text: 'Music',
      icon: 'music',
      size: [16, 18],
      data: settings.settings.music
    },
    animation: {
      text: 'Animation',
      icon: 'animation',
      size: [18, 16],
      data: settings.settings.animation
    }
  }

  const LINKS = [
    {
      id: '1',
      text: 'Free bets',
      icon: 'star',
      size: [16, 15]
    },
    {
      id: '2',
      text: 'My bet history',
      icon: 'history',
      size: [16, 15]
    },
    {
      id: '3',
      text: 'Game limits',
      icon: 'limits',
      size: [16, 10]
    },
    // {
    //   id: '4',
    //   text: 'How to play',
    //   icon: 'help',
    //   size: [20, 20]
    // },
    {
      id: '5',
      text: 'Game rules',
      icon: 'rules',
      size: [16, 15]
    },
    {
      id: '6',
      text: 'Provably fair settings',
      icon: 'fair',
      size: [13, 16]
    },
    {
      id: '7',
      text: 'Game room: Room #1',
      icon: 'multi-server',
      size: [19, 24]
    },
  ]

  const updateBalance = async () => {
    try {
      const data = await getData("balance")
      if (data) {
        dispatch(setSettings({
          ...settings,
          balance: data,
        }))
      }
    } catch (error) {
      console.error("Error update balance:", error)
    }
  }

  const handleOption = (value) => {
    dispatch(setSettings({
      ...settings,
      settings: {
        ...settings.settings,
        [value]: settings.settings[value] === '0' ? '1' : '0',
      }
    }))
  }

  const handleAvatar = () => {
    setActive(false)
    openModal({
      title: 'Choose Game Avatar!',
      body: <AvatarModal />,
    })
  }

  useEffect(() => {
    const intervalId = setInterval(updateBalance, 30000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={style.block}>
      <div className={style.logo}>
        <img
          src={game.logo}
          className={style.logo}
          alt={game.name}
        />
      </div>
      <div className={style.options}>
        <p className={style.balance}>
          <strong className={style.label}>{settings.balance.balance}</strong> {settings.currency.currency}
        </p>
        <hr className={style.hr} />
        <button
          type={'button'}
          className={style.toggle}
          onClick={() => setActive(!active)}
          aria-label={'Show menu'}
          title={'Show menu'}
        >
          <Icon
            iconName={'toggle'}
            width={18}
            height={12}
          />
        </button>
      </div>
      {
        active &&
        <div className={style.dropdown}>
          <div className={style.header}>
            <Avatar
              url={settings.avatar}
              alt={settings.username}
              size={'md'}
            />
            <strong className={style.nickname}>{mask(settings.username)}</strong>
            <button
              type={'button'}
              className={style.change}
              onClick={handleAvatar}
              aria-label={'Change avatar'}
              title={'Change avatar'}
            >
              <Icon
                iconName={'user-circle'}
                width={20}
                height={20}
              />
              <span>Change avatar</span>
            </button>
          </div>
          <div className={style.body}>
            {
              Object.entries(OPTIONS).map(([key, el]) =>
                <div
                  key={key}
                  className={
                    classNames(
                      style.link,
                      style.disable
                    )
                  }
                >
                  <span className={style.icon}>
                    <Icon
                      iconName={el.icon}
                      width={el.size[0]}
                      height={el.size[1]}
                    />
                  </span>
                  <span className={style.text}>{el.text}</span>
                  <Toggle
                    data={el.data}
                    action={() => handleOption(key)}
                  />
                </div>
              )
            }
            <br />
            {
              LINKS.map((el, idx) =>
                <button
                  key={idx}
                  type={'button'}
                  className={style.link}
                  aria-label={el.text}
                >
                  <span className={style.icon}>
                    <Icon
                      iconName={el.icon}
                      width={el.size[0]}
                      height={el.size[1]}
                    />
                  </span>
                  {el.text}
                </button>
              )
            }
          </div>
          <Link
            className={style.footer}
            to={'/'}
          >
            <Icon
              iconName={'home'}
              width={16}
              height={14}
            />
            <span>Home</span>
          </Link>
        </div>
      }
    </div>
  )
}

export default Nav
