import React from 'react'
import { useModal } from 'context/ModalContext'
import classNames from 'classnames'

import { mask } from 'helpers/mask'
import { date } from 'helpers/date'

import Icon from 'components/Icon'
import RoundModal from 'modules/RoundModal'

import style from './index.module.scss'

const Bet = ({ data, type }) => {
  const { openModal } = useModal()

  const handleRound = () => {
    openModal({
      title: <>
              <span>Round: 7238138</span>
              <p
                className={style.odds}
                style={{color: data.color}}
              >
                {data.odds}x
              </p>
              <span>{date(data.created, 0)}</span>
            </>,
      body: <RoundModal id={data.id} />,
    })
  }

  return (
    <div
      className={
        classNames(
          style.block,
          data.win && style.win
        )
      }
    >
      <div className={style.cell}>
        {
          type === 0 &&
          <>
            <div className={style.avatar}>
              <img
                src={data.avatar}
                alt={data.username}
              />
            </div>
            <p>{mask(data.username)}</p>
          </>
        }
        {
          type === 1 &&
          <p>{date(data.created)}</p>
        }
      </div>
      <div className={style.cell}>
        <p className={style.stake}>{data.stake}</p>
      </div>
      <div className={style.cell}>
        <p
          className={style.odds}
          style={{
            color: data.color
          }}
        >
          {data.odds}x
        </p>
      </div>
      <div className={style.cell}>
        {
          type === 1 &&
          <>
            {
              data.cashed &&
              <p className={style.cashed}>{data.cashed}</p>
            }
            <button 
              type={'button'}
              className={style.round}
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
          </>
        }
      </div>
    </div>
  )
}

export default Bet
