import apiClient from '../../../api/client'

const adminUsersActions = {
  getUsers: () => {
    return async (dispatch) => {
      let response = await apiClient.get(`/admin/users`)
      if (response.data.success) {
        dispatch({ type: 'GET_USERS', payload: response.data.response })
        return response.data
      }
    }
  },
  createUser: (user) => {
    return async (dispatch) => {
      let response = await apiClient.post(`/admin/users`, user)
      if (response.data.success) {
        await dispatch({ type: 'ADD_USER', payload: response.data.response })
        return response.data
      }
    }
  },
  updateUser: (newUser, userId) => {
    return async (dispatch) => {
      let response = await apiClient.put(`/admin/user/${userId}`, newUser)
      if (response.data.success) {
        await dispatch({ type: 'UPDATE_USER', payload: newUser })
        return response.data
      }
    }
  },

  deleteUser: (userId) => {
    return async (dispatch) => {
      let response = await apiClient.delete(`/admin/user/${userId}`)
      if (response.data.success) {
        await dispatch({ type: 'DELETE_USER', payload: userId })
        return response.data
      }
    }
  },

  getUser: (id) => {
    return async (dispatch) => {
      dispatch({ type: 'GET_USER', payload: id })
    }
  },
}
export default adminUsersActions
