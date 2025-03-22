import { getData } from 'helpers/api'
import { types } from 'store/actionTypes'

export const setConfig = (value) => async dispatch => {
  if (value) {
    dispatch({
      type: types.SET_CONFIG,
      payload: value,
    })

    return value
  } 
  else {
    try {
      const data = await getData('config/')

      dispatch({
        type: types.SET_CONFIG,
        payload: data,
      })

      return data
    } catch (e) {
      console.log(e)
      return null
    }
  }
}