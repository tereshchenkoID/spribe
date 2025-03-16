import { getData } from 'helpers/api'
import { types } from 'store/actionTypes'

export const setGame = (game) => async dispatch => {
  try {
    console.log(game)

    const data = await getData('game')

    dispatch({
      type: types.SET_GAME,
      payload: data,
    })

    return data
  } catch (e) {
    console.log(e)
    return null
  }
}
