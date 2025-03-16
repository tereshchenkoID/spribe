import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setGames } from 'store/actions/gamesAction';

import style from './index.module.scss';

const Game = () => {
  const dispatch = useDispatch()
  const { games } = useSelector(state => state.games)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(setGames()).then(() => {
      setLoading(false)
    })
  }, [])

  if (loading)
    return

  return (
    <div className={style.block}>
      <ul className={style.list}>
        {
          games.map((item) => (
            <li key={item.id}>
              <Link
                className={style.link}
                to={`/game/${item.url}`}
              >
                <div className={style.preview}>
                  <img
                    className={style.img}
                    src={item.preview}
                    alt={item.name}
                  />
                </div>
                <p className={style.name}>{item.name}</p>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Game;
