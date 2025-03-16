import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'

import settingsReducer from './reducers/settingsReducer'
import betsReducer from './reducers/betsReducer'
import gamesReducer from 'store/reducers/gamesReducer'
import gameReducer from 'store/reducers/gameReducer copy'

const allReducer = combineReducers({
  games: gamesReducer,
  game: gameReducer,
  settings: settingsReducer,
  bets: betsReducer,
})

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
const middleware = applyMiddleware(thunk)
const store = createStore(allReducer, composeEnhancers(middleware))

export default store
