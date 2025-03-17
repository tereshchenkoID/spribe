import React, { useEffect, useState } from 'react'

import { mask } from 'helpers/mask'
import { getData } from 'helpers/api'

import Icon from 'components/Icon'
import Avatar from 'modules/Avatar'

import style from './index.module.scss'

const RoundModal = ({ id }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log(id)
    getData('round').then(json => {
      setData(json)
    })
  }, [])

  if (!data)
    return

  return (
    <div className={style.block}>
      <div>
        <div className={style.wrapper}>
          <Icon
            iconName={'server'}
            width={32}
            height={32}
          />
          <div>
            <h6 className={style.title}>Server Seed:</h6>
            <p className={style.label}>Generated on our side</p>
          </div>
        </div>
        <div className={style.value}>{data.server_seed}</div>
      </div>
      <div>
        <div className={style.wrapper}>
          <Icon
            iconName={'client'}
            width={32}
            height={25}
          />
          <div>
            <h6 className={style.title}>Client Seed:</h6>
            <p className={style.label}>Generated on players side</p>
          </div>
        </div>
        {
          data.client_seed.map((el, idx) =>
            <div
              key={idx}
              className={style.win}
            >
              <p className={style.label}>Player #{idx + 1}:</p>
              <Avatar
                url={el.avatar}
                alt={el.username}
                size={'md'}
              />
              <strong>{mask('Nickname')}</strong>
              <p className={style.label}>Seed:</p>
              <h6 className={style.title}>{el.seed}</h6>
            </div>
          )
        }
      </div>
      <div>
        <div className={style.wrapper}>
          <Icon
            iconName={'hash'}
            width={30}
            height={30}
          />
          <div>
            <h6 className={style.title}>Combined SHA512 Hash:</h6>
            <p className={style.label}>Above seeds combined and converted to SHA512 Hash. This is your game result</p>
          </div>
        </div>
        <div className={style.value}>{data.combined_seed.seed}</div>
        <div className={style.table}>
          <div className={style.row}>
            <p className={style.label}>Hex:</p>
            <p className={style.label}>Decimal:</p>
            <p className={style.label}>Result:</p>
          </div>
          <div className={style.row}>
            <h6 className={style.title}>{data.combined_seed.hex}</h6>
            <h6 className={style.title}>{data.combined_seed.decimal}</h6>
            <h6 className={style.title}>{data.combined_seed.result}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoundModal