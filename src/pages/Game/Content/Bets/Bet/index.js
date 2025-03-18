import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { setToastify } from 'store/actions/toastifyAction'

import Range from 'modules/Range'

import style from './index.module.scss'

const TABS = [
  'Bet',
  'Auto',
  'Free bet'
]

const Bets = ({ data, config, action }) => {
  const dispatch = useDispatch()
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

  return (
    <div className={style.block}>
      <div className={style.header}>
        <div className={style.tab}>
          {
            TABS.map((el, idx) =>
              <button
                key={idx}
                type={'button'}
                aria-label={el}
                className={
                  classNames(
                    style.link,
                    active === idx && style.active
                  )
                }
                onClick={() => setActive(idx)}
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
