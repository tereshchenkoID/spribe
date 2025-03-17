import React from 'react'
import { useModal } from 'context/ModalContext'
import classNames from 'classnames'

import { date } from 'helpers/date'

import Icon from 'components/Icon'
import Odd from 'modules/Odd'
import RoundModal from 'modules/RoundModal'

import style from './index.module.scss'

const Fairness = ({ data, size = 'sm' }) => {
  const { openModal } = useModal()

  const handleRound = () => {
    openModal({
      title: <>
              <span>Round: 7238138</span>
              <Odd color={data.color} odd={data.odds} size={'md'} />
              <span>{date(data.created, 0)}</span>
             </>,
      body: <RoundModal id={data.id} />
    })
  }

  return (
    <button
      type={'button'}
      className={
        classNames(
          style.block,
          style[size]
        )
      }
      aria-label={'Show round result'}
      title={'Show round result'}
      onClick={handleRound}
    >
      <Icon
        iconName={'fair'}
        width={16}
        height={16}
      />
    </button>
  )
}

export default Fairness
