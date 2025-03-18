import { getData } from 'helpers/api'
import { types } from 'store/actionTypes'

export const setBets = () => async dispatch => {
  try {
    const data = await getData('bets/')

    dispatch({
      type: types.SET_BETS,
      payload: data,
    })

    return data
  } catch (e) {
    console.log(e)
    return null
  }
}
