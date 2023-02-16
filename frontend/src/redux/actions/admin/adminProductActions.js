import apiClient from '../../../api/client'

const adminProductActions = {
  getProducts: () => {
    return async (dispatch) => {
      try {
        const response = await apiClient.get(`/products`)
        if (!response.data.success) throw new Error(response.data.error)
        await dispatch({
          type: 'GET_PRODUCTS',
          payload: response.data.response,
        })
        return { success: true, response: response.data.response }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  createProduct: (product, props) => {
    return async (dispatch) => {
      let response = await apiClient.post(`/admin/productos`, product)
      if (response.data.success) {
        await dispatch({ type: 'ADD_PRODUCT', payload: response.data.response })
        return response.data
      }
    }
  },
  updateProduct: (updated, productId) => {
    return async (dispatch) => {
      let response = await apiClient.put(
        `/admin/producto/${productId}`,
        updated
      )
      if (response.data.success) {
        await dispatch({ type: 'UPDATE_PRODUCT', payload: updated })
        return response.data
      }
    }
  },
  deleteProduct: (productId) => {
    return async (dispatch) => {
      let response = await apiClient.delete(`/admin/producto/${productId}`)
      if (response.data.success) {
        await dispatch({ type: 'DELETE_PRODUCT', payload: productId })
        return response.data
      }
    }
  },
}

export default adminProductActions
