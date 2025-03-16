import React from 'react'
import { useModal } from 'context/ModalContext'

import { date } from 'helpers/date'

import Icon from 'components/Icon'
import Odd from 'modules/Odd'
import RoundModal from 'modules/RoundModal'

import style from './index.module.scss'

const Fairness = ({ data }) => {
  const { openModal } = useModal()

  const handleRound = () => {
    openModal({
      title: <>
              <span>Round: 7238138</span>
              <Odd color={data.color} odd={data.odds} />
              <span>{date(data.created, 0)}</span>
             </>,
      body: <RoundModal id={data.id} />
    })
  }

  return (
    <button
      type={'button'}
      className={style.block}
      aria-label={'Show round result'}
      title={'Show round result'}
      onClick={handleRound}
    >
      <Icon
        iconName={'fairness'}
        width={22}
        height={26}
      />
    </button>
  )
}

export default Fairness
