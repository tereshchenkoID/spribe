import React, { useState, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from 'context/ModalContext'
import classNames from 'classnames'

import { setToastify } from 'store/actions/toastifyAction'

import Range from 'modules/Range'
import Loader from 'components/Loader'
import AutoModal from 'modules/AutoModal'

import style from './index.module.scss'

const TABS = [
  'Bet',
  'Auto',
  'Free bet'
]

const Bets = ({ data, config, action }) => {
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const { settings } = useSelector(state => state.settings)
  const [active, setActive] = useState(0)
  const [bet, setBet] = useState(settings.betting.minBet)
  const min = parseFloat(settings.betting.minBet)
  const max = parseFloat(settings.betting.maxBet)
  const step = parseFloat(settings.betting.step)
  const currency = settings.currency.currency

  const handleIncrement = (value) => {
    const result = parseFloat(bet) + parseFloat(value)

    if (result < min) {
      setBet(min)
      dispatch(
        setToastify({
          type: 'error',
          text: `The value cannot be lower than the minimum: ${min}.`,
        }),
      )
    } else if (result > max) {
      setBet(max)
      dispatch(
        setToastify({
          type: 'error',
          text: `The value cannot exceed the maximum: ${max}.`,
        }),
      )
    } else {
      setBet(parseFloat(result).toFixed(2))
    }
  }

  const handleModal = () => {
    setActive(false)
    openModal({
      title: 'Auto Modal',
      body: <Suspense 
              fallback={
                <div className={style.loading}>
                  <Loader />
                </div>
              }
            >
              <AutoModal />
            </Suspense>,
    })
  }

  const handleTab = (idx) => {
    setActive(idx)

    if(idx === 1) {
      handleModal()
    }
  }

  return (
    <div className={style.block}>
      <div className={style.header}>
        <div className={style.tab}>
          {
            TABS.map((el, idx) =>
              <button
                key={idx}
                className={
                  classNames(
                    style.link,
                    active === idx && style.active
                  )
                }
                type={'button'}
                aria-label={el}
                onClick={() => handleTab(idx)}
              >
                {el}
              </button>
            )
          }
        </div>
        {
          data.action &&
          <button
            type={'button'}
            aria-label={'Bet action'}
            title={'Bet action'}
            className={style.add}
            onClick={action}
          >
            {config.length === 1 ? '+' : '-'}
          </button>
        }
      </div>
      <div className={style.grid}>
        <div className={style.cell}>
          <Range
            data={bet}
            action={setBet}
            min={min}
            max={max}
            step={step}
            currency={currency}
          />
        </div>
        {
          settings.betting.quickBet.split(',').map((el, idx) =>
            <div
              key={idx}
              className={style.cell}
            >
              <button
                type={'button'}
                className={style.quick}
                aria-label={el}
                title={el}
                onClick={() => handleIncrement(el)}
              >
                {el}
              </button>
            </div>
          )
        }
        <div className={style.cell}>
          <button
            type={'button'}
            className={style.bet}
            aria-label={'Bet'}
            title={'Bet'}
          >
            <p>BET 1</p>
            <strong>{bet} {settings.currency.currency}</strong>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Bets
