import { postData } from 'helpers/api'
import { types } from 'store/actionTypes'

export const setGame = (game) => async dispatch => {
  try {
    const formData = new FormData()
    formData.append('id', game)
    
    const data = await postData('game/', formData)

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
