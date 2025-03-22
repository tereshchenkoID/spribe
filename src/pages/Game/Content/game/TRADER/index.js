import React from 'react'

import style from './index.module.scss'

const TRADER = () => {
  return (
    <div className={style.block}>
      <div className={style.history}>
        {Array.from({ length: 41 }, (_, i) =>
          <button
            key={i}
            type={'button'}
            className={style.odd}
            title={`Odd ${i + 1}`}
            aria-label={`Odd ${i + 1}`}
          >
            0.45
          </button>
        )}
      </div>
    </div>
  );
}

export default TRADER
