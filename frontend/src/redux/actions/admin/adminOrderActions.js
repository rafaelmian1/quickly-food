import apiClient from '../../../api/client'

const adminOrderActions = {
  getOrders: () => {
    return async (dispatch) => {
      let response = await apiClient.get(`/admin/orders`)
      if (response.data.success) {
        await dispatch({ type: 'GET_ORDERS', payload: response.data.response })
        return response.data
      }
    }
  },
  updateOrder: (updated, orderId) => {
    return async (dispatch) => {
      let response = await apiClient.put(`/admin/order/${orderId}`, {
        status: updated,
      })
      if (response.data.success) {
        dispatch({ type: 'EMIT_UPDATE', payload: response.data.response })
        dispatch({
          type: 'UPDATE_ADMIN_ORDER',
          payload: response.data.response,
        })
        return response.data
      }
    }
  },
  deleteOrder: (orderId) => {
    return async (dispatch) => {
      let response = await apiClient.delete(`/admin/order/${orderId}`)
      if (response.data.success) {
        await dispatch({ type: 'DELETE_ORDER', payload: orderId })
        return response.data
      }
    }
  },
}

export default adminOrderActions
