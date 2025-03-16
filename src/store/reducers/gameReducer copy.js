import { types } from 'store/actionTypes'

const initialState = {
  game: {},
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_GAME:
      return {
        ...state,
      }
    case types.SET_GAME:
      return {
        ...state,
        game: action.payload,
      }
    default:
      return state
  }
}

export default gameReducer