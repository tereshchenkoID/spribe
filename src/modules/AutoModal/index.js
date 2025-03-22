import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'

import Radio from 'components/Radio'
import Toggle from 'components/Toggle'
import Range from 'modules/Range'

import style from './index.module.scss'

const AutoModal = () => {
  const { settings } = useSelector(state => state.settings)
  const [config, setConfig] = useState({
    rounds: {
      text: 'Number of rounds',
      type: 'radio',
      multiplier: false,
      value: {
        id: 0,
        value: 10,
        text: '10'
      },
      options: [
        {
          id: 0,
          value: 10,
          text: '10'
        },
        {
          id: 1,
          value: 20,
          text: '20'
        },
        {
          id: 2,
          value: 50,
          text: '50'
        },
        {
          id: 3,
          value: 100,
          text: '100'
        }
      ]
    },
    auto_cash_out: {
      text: 'Auto Cash out after',
      type: 'radio-range',
      multiplier: false,
      value: {
        id: 0,
        value: 1.10,
        min: 1.10,
        max: 100000,
        text: 'X reached'
      },
      options: [
        {
          id: 0,
          value: 1.10,
          min: 1.10,
          max: 100000,
          text: 'X reached'
        },
        {
          id: 1,
          value: 1,
          min: 1,
          max: 100000,
          text: 'Cash decreases by'
        },
        {
          id: 2,
          value: 0.10,
          min: 0.10,
          max: 100000,
          text: 'Exceeds in a single win'
        }
      ]
    },
    stop_auto_game: {
      text: `Stop Auto Game if profit ${settings.currency.currency}`,
      multiplier: true,
      type: 'checkbox-range',
      value: [],
      options: [
        {
          id: 0,
          set: 0,
          value: 0.10,
          min: 0.10,
          max: 100000,
          text: 'X reached'
        },
        {
          id: 1,
          set: 0,
          value: 0.10,
          min: 0.10,
          max: 100000,
          text: 'Steps'
        },
        {
          id: 2,
          set: 0,
          value: 0.10,
          min: 0.10,
          max: 100000,
          text: `Win Amount ${settings.currency.currency}`
        }
      ]
    },
    lost: {
      text: 'If I lost',
      type: 'radio-range',
      multiplier: false,
      value: {
        id: 0,
        value: 1,
        text: 'Return to initial bet'
      },
      options: [
        {
          id: 0,
          value: 1,
          text: 'Return to initial bet'
        },
        {
          id: 1,
          value: 1,
          min: 1,
          max: 100,
          text: 'Increase bet',
          symbol: '%'
        },
        {
          id: 2,
          value: 1,
          min: 1,
          max: 100,
          text: 'Decrease bet',
          symbol: '%'
        },
      ]
    },
    win: {
      text: 'If I win',
      type: 'radio-range',
      multiplier: false,
      value: {
        id: 0,
        value: 1,
        text: 'Return to initial bet'
      },
      options: [
        {
          id: 0,
          value: 1,
          text: 'Return to initial bet'
        },
        {
          id: 1,
          value: 1,
          min: 1,
          max: 100,
          text: 'Increase bet',
          symbol: '%'
        },
        {
          id: 2,
          value: 1,
          min: 1,
          max: 100,
          text: `Decrease ${settings.currency.currency}`,
          symbol: '%'
        },
      ]
    }
  })

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
              : [...(data.value || []), option]
          }
        };
      } else {
        return {
          ...prevConfig,
          [key]: {
            ...data,
            value: option
          }
        };
      }
    })
  }

  const updateValue = (key, id, value) => {
    setConfig(prevConfig => {
      const data = prevConfig[key]
  
      if (!data) return prevConfig
  
      if (data.multiplier) {
        const updatedValue = data.value.map(item =>
          item.id === id ? { ...item, value: parseFloat(value) } : item
        )

        const updatedOptions = data.options.map(option =>
          option.id === id ? { ...option, value: value } : option
        )
  
        return {
          ...prevConfig,
          [key]: {
            ...data,
            value: updatedValue,
            options: updatedOptions
          }
        }
      } else {
        const updatedOptions = data.options.map(option =>
          option.id === id ? { ...option, value: value } : option
        )

        return {
          ...prevConfig,
          [key]: {
            ...data,
            value: {
              ...data.value,
              value: parseFloat(value)
            },
            options: updatedOptions
          }
        }
      }
    })
  }

  return (
    <div className={style.block}>
      {/* {console.log(config)} */}
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
                              action={(value) => updateValue(key, option.id, value)}
                              min={parseFloat(option.min)}
                              max={parseFloat(option.max)}
                              step={0.10}
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
                          action={(value) => updateValue(key, option.id, value)}
                          min={parseFloat(option.min)}
                          max={parseFloat(option.max)}
                          step={0.10}
                          classes={'alt'}
                        />
                      </Fragment>
                    )
                  }

                  return (
                    <Fragment key={option.id}>
                      <Radio
                        key={option.id}
                        name={key}
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
  )
}

export default AutoModal