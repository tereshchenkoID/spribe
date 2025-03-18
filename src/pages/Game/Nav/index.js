import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from 'context/ModalContext'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { setSettings } from 'store/actions/settingsAction'

import { getData } from 'helpers/api'

import Icon from 'components/Icon'
import Toggle from 'components/Toggle'
import Avatar from 'modules/Avatar'

import AvatarModal from 'modules/AvatarModal'
import LimitsModal from 'modules/LimitsModal'
import LanguageModal from 'modules/LanguageModal'
import HistoryModal from 'modules/HistoryModal'

import style from './index.module.scss'

const Nav = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const { game } = useSelector(state => state.game)
  const { settings } = useSelector(state => state.settings)
  const [active, setActive] = useState(false)

  const handleModal = (type) => {
    let title
    let template

    switch (type) {
      case 'limits':
        title = 'Game limits'
        template = <LimitsModal />
        break;
      case 'avatar':
        title = 'Choose Game Avatar'
        template = <AvatarModal />
        break;
      case 'language':
        title = 'Choose Language'
        template = <LanguageModal />
        break;
      case 'history':
        title = 'Bet history'
        template = <HistoryModal />
        break;
      default:
        return
    }

    setActive(false)
    openModal({
      title: title,
      body: template,
    })
  }

  const OPTIONS = {
    sound: {
      text: 'Sound',
      icon: 'sound',
      data: settings.settings.sound
    },
    music: {
      text: 'Music',
      icon: 'music',
      data: settings.settings.music
    },
    animation: {
      text: 'Animation',
      icon: 'animation',
      data: settings.settings.animation
    }
  }

  const LINKS = [
    {
      id: '1',
      text: 'Free bets',
      icon: 'star',
    },
    {
      id: '2',
      text: 'My bet history',
      icon: 'history',
      action: () => handleModal('history')
    },
    {
      id: '3',
      text: 'Game limits',
      icon: 'limits',
      action: () => handleModal('limits')
    },
    {
      id: '4',
      text: 'How to play',
      icon: 'help',
    },
    {
      id: '5',
      text: 'Game rules',
      icon: 'rules',
    },
    // {
    //   id: '6',
    //   text: 'Provably fair settings',
    //   icon: 'fair',
    // },
    // {
    //   id: '7',
    //   text: 'Game room: Room #1',
    //   icon: 'multi-server',
    // },
  ]

  const updateBalance = async () => {
    try {
      const data = await getData('balance/')
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
          <strong className={style.label}>{settings.balance.balance}</strong>
          <span className={style.currency}>{settings.currency.currency}</span>
        </p>
        <button
          type={'button'}
          className={style.toggle}
          onClick={() => setActive(!active)}
          aria-label={'Show menu'}
          title={'Show menu'}
        >
          <Icon
            iconName={'toggle'}
            width={24}
            height={24}
          />
        </button>
      </div>
      {
        active &&
        <>
          <div
            className={style.shadow}
            onClick={() => setActive(!active)}
          />
          <div className={style.dropdown}>
            <div
              className={style.header}
              onClick={() => handleModal('avatar')}
            >
              <Avatar
                url={settings.avatar}
                alt={settings.username}
                size={'lg'}
              />
              <strong className={style.nickname}>{settings.username}</strong>
            </div>
            <div className={style.wrapper}>
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
                    <Icon
                      iconName={el.icon}
                      className={style.icon}
                    />
                    <span className={style.text}>{el.text}</span>
                    <Toggle
                      data={el.data}
                      action={() => handleOption(key)}
                    />
                  </div>
                )
              }
              <button
                type={'button'}
                className={style.link}
                aria-label={'Language'}
                title={'Language'}
                onClick={() => handleModal('language')}
              >
                <span className={style.language}>
                  <img
                    src={'/images/countries/gb.svg'}
                    alt={'en'}
                  />
                </span>
                <span>Language</span>
              </button>
            </div>
            <div className={style.wrapper}>
              {
                LINKS.map((el, idx) =>
                  <button
                    key={idx}
                    type={'button'}
                    className={style.link}
                    aria-label={el.text}
                    title={el.text}
                    onClick={el.action}
                  >
                    <Icon
                      iconName={el.icon}
                      className={style.icon}
                    />
                    {el.text}
                  </button>
                )
              }
            </div>
            <div className={style.wrapper}>
              <Link
                className={style.link}
                to={'/'}
              >
                <Icon
                  iconName={'home'}
                  className={style.icon}
                />
                <span>Home</span>
              </Link>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Nav
