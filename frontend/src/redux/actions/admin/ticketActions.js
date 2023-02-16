import apiClient from '../../../api/client'

const ticketActions = {
  createTicket: (ticket) => {
    return async () => {
      try {
        await apiClient.post(`/tickets`, ticket)
      } catch (err) {
        console.log(err.message)
      }
    }
  },
  getTickets: () => {
    return async (dispatch) => {
      let res = await apiClient.get(`/tickets`)
      dispatch({ type: 'SET_TICKETS', payload: res.data })
    }
  },
}

export default ticketActions
