import React from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

import { setToastify } from 'store/actions/toastifyAction'

import style from './index.module.scss'

const Range = ({ data, action, min, max, step, isDisabled, currency = 'USD', classes = 'primary' }) => {
  const dispatch = useDispatch()

  const showToast = (message) => {
    dispatch(setToastify({ type: 'error', text: message }))
  }

  const adjustValue = (value) => {
    if (value < min) {
      showToast(`The value cannot be lower than the minimum: ${min} ${currency}.`)
      return min
    }
    if (value > max) {
      showToast(`The value cannot exceed the maximum: ${max} ${currency}.`)
      return max
    }
    return value
  }

  const handleDecrement = () => action(adjustValue(parseFloat(data) - step).toFixed(2))

  const handleIncrement = () => action(adjustValue(parseFloat(data) + step).toFixed(2))

  const inputHandler = (value) => {
    let num = parseFloat(value)
    if (!isNaN(num)) action(adjustValue(num))
  }

  return (
    <div 
      className={
        classNames(
          style.block,
          style[classes],
          isDisabled && style.disabled
        )
      }
    >
      <button
        type="button"
        className={
          classNames(
            style.button, 
            parseFloat(data) <= min && style.disabled
          )
        }
        aria-label={'Decrement'}
        title={'Decrement'}
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        type="number"
        className={style.input}
        value={data}
        aria-label={'Range'}
        onChange={(e) => inputHandler(e.target.value)}
      />
      <button
        type="button"
        className={
          classNames(
            style.button, 
            parseFloat(data) >= max && style.disabled
          )
        }
        aria-label={'Increment'}
        title={'Increment'}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  )
}

export default Range
