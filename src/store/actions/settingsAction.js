import { getData } from 'helpers/api'
import { types } from 'store/actionTypes'

export const setSettings = (value) => async dispatch => {
  if (value) {
    dispatch({
      type: types.SET_SETTINGS,
      payload: value,
    })

    return value
  } 
  else {
    try {
      const data = await getData('settings')

      dispatch({
        type: types.SET_SETTINGS,
        payload: data,
      })

      return data
    } catch (e) {
      console.log(e)
      return null
    }
  }
}