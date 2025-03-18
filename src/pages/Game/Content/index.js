import React from 'react'
import { useTranslation } from 'react-i18next'

import History from './History'
import Bets from './Bets'

import style from './index.module.scss'

const Content = () => {
  const { t } = useTranslation()

  return (
    <div className={style.block}>
      <div className={style.content}>
        {t('currency')}
        <History />
      </div>
      <Bets />
    </div>
  );
}

export default Content
