import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useModal } from 'context/ModalContext'
import classNames from 'classnames'

import Radio from 'components/Radio'
import Toggle from 'components/Toggle'
import Range from 'modules/Range'

import style from './index.module.scss'

const AutoModal = () => {
  const { closeModal } = useModal()
  const { settings } = useSelector(state => state.settings)
  const initialConfig = { 
    rounds: { 
      text: 'Number of rounds', 
      type: 'radio', 
      multiplier: false, 
      value: { id: 0, value: 10, text: '10' }, 
      options: [ 
        { id: 0, value: 10, text: '10' }, 
        { id: 1, value: 20, text: '20' }, 
        { id: 2, value: 50, text: '50' }, 
        { id: 3, value: 100, text: '100' } 
      ] 
    },
    auto_cash_out: { 
      text: 'Auto Cash out after', 
      type: 'radio-range', 
      multiplier: false, 
      value: { id: 0, value: 1.10, min: 1.10, max: 100000, text: 'X reached' }, 
      options: [ 
        { id: 0, value: 1.10, min: 1.10, max: 100000, step: 0.1, text: 'X reached' }, 
        { id: 1, value: 1, min: 1, max: 100000, step: 1, text: 'Steps' }, 
        { id: 2, value: 0.10, min: 0.10, max: 100000, step: 0.1, text: 'Exceeds in a single win' } 
      ] 
    }, 
    stop_auto_game: { 
      text: `Stop Auto Game if profit ${settings.currency.currency}`, 
      multiplier: true, 
      type: 'checkbox-range', 
      value: [], 
      options: [ 
        { id: 0, value: 0.10, min: 0.10, max: 100000, step: 0.1, text: 'Cash increases by' }, 
        { id: 1, value: 0.10, min: 0.10, max: 100000, step: 0.1, text: 'Cash decreases by' }, 
        { id: 2, value: 0.10, min: 0.10, max: 100000, step: 0.1, text: `Win Amount ${settings.currency.currency}` } 
      ] 
    },
    lost: { 
      text: 'If I lost', 
      type: 'radio-range', 
      multiplier: false, 
      value: { id: 0, value: 1, text: 'Return to initial bet' }, 
      options: [ 
        { id: 0, value: 1, text: 'Return to initial bet' }, 
        { id: 1, value: 1, min: 1, max: 100, step: 1, text: 'Increase bet, %' }, 
        { id: 2, value: 1, min: 1, max: 100, step: 1, text: 'Decrease bet, %' } 
      ] 
    }, 
    win: { 
      text: 'If I win', 
      type: 'radio-range', 
      multiplier: false, 
      value: { id: 0, value: 1, text: 'Return to initial bet' }, 
      options: [ 
        { id: 0, value: 1, text: 'Return to initial bet' }, 
        { id: 1, value: 1, min: 1, max: 100, step: 1, text: 'Increase bet, %' }, 
        { id: 2, value: 1, min: 1, max: 100, step: 1, text: `Decrease, %` } 
      ] 
    } 
  }

  const [config, setConfig] = useState(initialConfig)

  const inMultiplierExists = (key, id) => {
    return config[key].value.some(item => item.id === id)
  }

  const updateConfig = (key, option) => {
    setConfig(prevConfig => {
      const data = prevConfig[key]
      if (!data) return prevConfig

      if (data.multiplier) {
        const exists = data.value?.some(item => item.id === option.id)
        return {
          ...prevConfig,
          [key]: {
            ...data,
            value: exists
              ? data.value.filter(item => item.id !== option.id)
              : [...(data.value || []), option],
            options: data.options.map(opt =>
              opt.id === option.id ? { ...opt, value: option.value } : opt
            )
          }
        }
      } else {
        return {
          ...prevConfig,
          [key]: {
            ...data,
            value: option,
            options: data.options.map(opt =>
              opt.id === option.id ? { ...opt, value: option.value } : opt
            )
          }
        }
      }
    })
  }

  const updateValue = (key, id, value) => {
    setConfig(prevConfig => {
      const data = prevConfig[key]
      if (!data) return prevConfig

      const parsedValue = parseFloat(value)

      if (data.multiplier) {
        return {
          ...prevConfig,
          [key]: {
            ...data,
            value: data.value.map(item =>
              item.id === id ? { ...item, value: parsedValue } : item
            ),
            options: data.options.map(option =>
              option.id === id ? { ...option, value: parsedValue } : option
            )
          }
        }
      } else {
        return {
          ...prevConfig,
          [key]: {
            ...data,
            value: {
              ...data.value,
              value: parsedValue
            },
            options: data.options.map(option =>
              option.id === id ? { ...option, value: parsedValue } : option
            )
          }
        }
      }
    })
  }

  const handleSet = () => {
    closeModal()
  }

  return (
    <div className={style.block}>
      <div className={style.body}>
        {/* <pre className={style.pre}>{JSON.stringify(config, null, 2)}</pre> */}
        {
          Object.entries(config).map(([key, data]) => (
            <div key={key}>
              <p className={style.text}>{data.text}:</p>
              <div className={style.wrapper}>
                <div className={style.row}>
                  {data.options.map(option => {
                    if (data.type === 'radio-range') {
                      return (
                        <Fragment key={option.id}>
                          <Radio
                            name={key}
                            data={data.value.id === option.id ? '1' : '0'}
                            action={() => updateConfig(key, option)}
                            placeholder={option.text}
                          />
                          {
                            (option.min && option.max)
                              ?
                              <Range
                                isDisabled={data.value.id !== option.id}
                                data={parseFloat(option.value)}
                                min={parseFloat(option.min)}
                                max={parseFloat(option.max)}
                                step={parseFloat(option.step)}
                                action={(value) => updateValue(key, option.id, value)}
                                classes={'alt'}
                              />
                              :
                              <div />
                          }
                        </Fragment>
                      )
                    }

                    if (data.type === 'checkbox-range') {
                      return (
                        <Fragment key={option.id}>
                          <Toggle
                            data={inMultiplierExists(key, option.id) ? '1' : '0'}
                            action={() => updateConfig(key, option)}
                            placeholder={option.text}
                          />
                          <Range
                            data={parseFloat(option.value)}
                            min={parseFloat(option.min)}
                            max={parseFloat(option.max)}
                            step={parseFloat(option.step)}
                            action={(value) => updateValue(key, option.id, value)}
                            classes={'alt'}
                          />
                        </Fragment>
                      )
                    }

                    return (
                      <Fragment key={option.id}>
                        <Radio
                          data={data.value.id === option.id ? '1' : '0'}
                          action={() => updateConfig(key, option)}
                          placeholder={option.text}
                        />
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className={style.footer}>
        <button
          type={'button'}
          className={
            classNames(
              style.button,
              style.success
            )
          }
          aria-label={'Start auto'}
          title={'Start auto'}
          onClick={() => handleSet()}
        >
          Start auto
        </button>
        <button
          type={'button'}
          className={
            classNames(
              style.button,
              style.alt
            )
          }
          aria-label={'Reset'}
          title={'Reset'}
          onClick={() => setConfig(initialConfig)}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default AutoModal