import apiClient from '../../api/client'

const orderActions = {
  getUserOders: (userId) => {
    return async (dispatch) => {
      try {
        const res = await apiClient.get(`/orders`, userId)
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: 'GET_USER_ORDERS', payload: res.data.response })
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  createOrder: ({ props, order, firstName, action }) => {
    return async (dispatch) => {
      try {
        const res = await apiClient.post(`/orders`, {
          ...order,
          firstName,
          action,
        })
        if (!res.data.success) throw new Error(res.data.error)
        const { newOrder, userData } = res.data.response
        dispatch({ type: 'CREATE_ORDER', payload: { newOrder, userData } })
        dispatch({ type: 'RESET_CART' })
        dispatch({ type: 'EMIT_CREATE' })
        return props.history.push('/profile/his')
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  cancellOrder: ({ orderId, firstName, action }) => {
    return async (dispatch) => {
      try {
        const res = await apiClient.put(`/order/${orderId}`)
        if (!res.data.success) throw new Error(res.data.error)
        const { orderCancelled, products } = res.data.response
        dispatch({ type: 'EMIT_CANCELL' })
        dispatch({ type: 'GET_PRODUCTS', payload: products })
        return dispatch({ type: 'CANCELL_ORDER', payload: { orderCancelled } })
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default orderActions
