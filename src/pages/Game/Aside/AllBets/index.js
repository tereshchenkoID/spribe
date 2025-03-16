import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setBets } from 'store/actions/betsAction';

import Icon from 'components/Icon';
import Bet from 'modules/Bet';

import style from './index.module.scss';

const AllBets = () => {
  const dispatch = useDispatch()
  const { bets } = useSelector(state => state.bets)

  useEffect(() => {
    dispatch(setBets())
  }, [])

  return (
    <div className={style.block}>
      <div className={style.header}>
        <h6 className={style.count}>All bets: <strong>{bets.length}</strong></h6>
        <button
          type={'button'}
          className={style.previous}
        >
          <Icon
            iconName={'history'}
            width={17}
            height={15}
          />
          <span>Previous round</span>
        </button>
      </div>
      <div className={style.body}>
        <div className={style.table}>
          <div className={style.row}>
            <div className={style.cell}>User</div>
            <div className={style.cell}>Bet USD X</div>
            <div className={style.cell}>Mult.</div>
            <div className={style.cell}>Cash out USD</div>
          </div>
          {
            bets?.map((el, idx) =>
              <Bet
                key={idx}
                data={el}
                type={0}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default AllBets;
