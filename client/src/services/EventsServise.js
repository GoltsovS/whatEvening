import api from '@/services/api'

export default {
  fetchEvents () {
    return api().get('events')
  },
  addNewEvent (params) {
    return api().post('events', params)
  },
  getEvent (params) {
    return api().get(`events/${params.id}`)
  },
  updateEvent (params) {
    return api().put(`events/${params.id}`, params)
  },
  deleteEvent (id) {
    return api().delete(`events/${id}`)
  }
}
