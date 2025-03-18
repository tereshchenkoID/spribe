import React from 'react'

import History from './History'
import Bets from './Bets'

import style from './index.module.scss'

const Content = () => {
  return (
    <div className={style.block}>
      <div className={style.content}>
        <History />
      </div>
      <Bets />
    </div>
  );
}

export default Content
