import React, { useState } from 'react';
import classNames from 'classnames';

import AllBets from './AllBets';
import MyBets from './MyBets';
import TopBets from './TopBets';

import style from './index.module.scss';

const TABS = [
  'All bets',
  'My bets',
  'Top'
]

const Aside = () => {
  const [active, setActive] = useState(2)

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
      </div>
      <div className={style.body}>
        {
          active === 0 &&
          <AllBets />
        }
        {
          active === 1 &&
          <MyBets />
        }
        {
          active === 2 &&
          <TopBets />
        }
      </div>
      <div className={style.footer}>
        This game is ...
      </div>
    </div>
  );
}

export default Aside;
