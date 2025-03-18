import React, { useState, lazy, Suspense } from 'react'
import classNames from 'classnames'

import Loader from 'components/Loader'

import style from './index.module.scss'

const TABS = [
  'Live bets',
  'Previous',
  'MyBets',
  'Top results'
]

const LazyComponents = {
  0: lazy(() => import('./AllBets')),
  2: lazy(() => import('./MyBets')),
  3: lazy(() => import('./TopBets'))
}

const Aside = () => {
  const [active, setActive] = useState(0)
  const ActiveComponent = LazyComponents[active] || null

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
                title={el}
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
      </div>
      <div className={style.body}>
        {ActiveComponent && (
          <Suspense fallback={<Loader />}>
            <ActiveComponent />
          </Suspense>
        )}
      </div>
      <div className={style.footer}>
        This game is ...
      </div>
    </div>
  )
}

export default Aside
