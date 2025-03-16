import { types } from 'store/actionTypes'

const initialState = {
  bets: [],
}

const betsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BETS:
      return {
        ...state,
      }
    case types.SET_BETS:
      return {
        ...state,
        bets: action.payload,
      }
    default:
      return state
  }
}

export default betsReducer