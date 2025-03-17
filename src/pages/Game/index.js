import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { setSettings } from 'store/actions/settingsAction'
import { setGame } from 'store/actions/gameAction'

import Nav from './Nav'
import Aside from './Aside'
import Content from './Content'

import style from './index.module.scss'

const Game = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      dispatch(setSettings()),
      dispatch(setGame(id))
    ]).then(([settings, game]) => {
      if (settings && game) {
        setLoading(false)
      }
    })
  }, [])

  if (loading)
    return

  return (
    <div className={style.block}>
      <Nav />
      <div className={style.body}>
        <Aside />
        <Content />
      </div>
    </div>
  )
}

export default Game
