import apiClient from '../../api/client'
import Swal from 'sweetalert2'
import io from 'socket.io-client'

const userActions = {
  createUser: (user, props) => {
    return async (dispatch) => {
      try {
        let res = await apiClient.post(`/user/signUp`, user)
        if (res.data.success) {
          const { user, userData, token } = res.data
          let keep = false
          localStorage.getItem('cart') &&
            JSON.parse(localStorage.getItem('cart')).length > 0 &&
            Swal.fire({
              title: 'Desea conservar el carrito actual?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí',
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                keep = true
              }
            })
          window.scrollTo(0, 0)
          props.history.push('/')
          let socket = io(``, {
            query: { socketId: userData._id, admin: false },
          })
          dispatch({ type: 'SET_SOCKET', payload: { socket } })
          return dispatch({
            type: 'LOG_IN',
            payload: { user, userData, token, keep },
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  logUser: (user, props) => {
    return async (dispatch) => {
      try {
        let res = await apiClient.post(`/user/logIn`, { ...user })
        if (res.data.success) {
          const { user, userData, token } = res.data
          window.scrollTo(0, 0)
          props.history.push('/')
          let socket = io('https://quickly-food.rafaelmiandev.com', {
            query: { socketId: userData._id, admin: userData.data.admin.flag },
          })
          dispatch({ type: 'SET_SOCKET', payload: { socket } })
          let cart =
            localStorage.getItem('cart') &&
            JSON.parse(localStorage.getItem('cart'))
          if (cart.length > 0) {
            Swal.fire({
              title: 'Desea conservar el carrito actual?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí',
              cancelButtonText: 'No',
            }).then(async (result) => {
              if (result.isConfirmed) {
                let response = await apiClient.post(`/products/keep-cart`, {
                  cart,
                  _id: userData._id,
                })
                return dispatch({
                  type: 'LOG_IN',
                  payload: { user, userData: response.data.user, token },
                })
              } else {
                return dispatch({
                  type: 'LOG_IN',
                  payload: { user, userData, token },
                })
              }
            })
          } else {
            return dispatch({
              type: 'LOG_IN',
              payload: { user, userData, token },
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  updateOrders: () => {
    return async (dispatch) => {
      let token = localStorage.getItem('token')
      try {
        if (!token) throw new Error('No hay token')
        let response = await apiClient.get(`/orders`)
        const { ordersId } = response.data
        dispatch({ type: 'UPDATE_USER_ORDERS', payload: ordersId })
      } catch (error) {
        console.log(error)
        // return dispatch({ type: 'LOG_OUT' })
      }
    }
  },
  logOut: () => {
    return (dispatch) => {
      return dispatch({ type: 'LOG_OUT' })
    }
  },
  verifyToken: () => {
    return async (dispatch) => {
      let token = localStorage.getItem('token')
      try {
        if (!token) throw new Error('No hay token')
        let response = await apiClient.get(`/user/token`)
        let socket = io('https://quickly-food.rafaelmiandev.com', {
          query: {
            socketId: response.data.userData._id,
            admin: response.data.userData.data.admin.flag,
          },
        })
        dispatch({ type: 'SET_SOCKET', payload: { socket } })
        dispatch({
          type: 'LOG_IN',
          payload: { ...response.data, token },
        })
      } catch (error) {
        console.log(error)
        // return dispatch({ type: 'LOG_OUT' })
      }
    }
  },
  manageCart: (body) => {
    return async (dispatch) => {
      let token = localStorage.getItem('token')
      if (!token) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (body.action === 'deleteLS') {
          localStorage.setItem(
            'cart',
            JSON.stringify(cart.filter((item, index) => index !== body.index))
          )
          return dispatch({
            type: 'LS_CART',
            payload: cart.filter((item, index) => index !== body.index),
          })
        } else {
          cart = cart ? [...cart, body.cartItem] : [body.cartItem]
          localStorage.setItem('cart', JSON.stringify(cart))
          return dispatch({ type: 'LS_CART', payload: cart })
        }
      } else {
        try {
          let response = await apiClient.put(`/products`, body)
          if (!response?.data?.success) throw new Error('Algo salió mal')
          dispatch({
            type: 'GET_PRODUCTS',
            payload: response.data.products,
          })
          return dispatch({
            type: 'HANDLE_CART',
            payload: response.data.userData,
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  },

  favHandler: (body) => {
    return async (dispatch) => {
      try {
        let response = await apiClient.put(`/products/favs`, body)
        if (!response?.data?.success) throw new Error('Algo salió mal')
        dispatch({
          type: 'GET_PRODUCTS',
          payload: response.data.response,
        })
        return response?.data?.success
      } catch (error) {
        console.log(error)
      }
    }
  },
  updateUser: ({
    action,
    userData,
    fileImg,
    currentPassword,
    password,
    newPaymentCard,
    paymentCardId,
    newAddress,
    addressId,
  }) => {
    return async (dispatch) => {
      let token = localStorage.getItem('token')
      let body = fileImg || {
        action,
        userData,
        currentPassword,
        password,
        newPaymentCard,
        paymentCardId,
        newAddress,
        addressId,
      }
      try {
        let res = await apiClient.put(`/user`, body)
        return dispatch({
          type: 'LOG_IN',
          payload: { ...res.data, token, keep: true },
        })
      } catch (error) {
        console.log(error)
        // return dispatch({ type: 'LOG_OUT' })
      }
    }
  },
}

export default userActions
