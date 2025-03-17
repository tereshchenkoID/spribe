import { getData } from 'helpers/api'
import { types } from 'store/actionTypes'

export const setGames = () => async dispatch => {
  try {
    const data = await getData('games/')

    dispatch({
      type: types.SET_GAMES,
      payload: data,
    })

    return data
  } catch (e) {
    console.log(e)
    return null
  }
}
