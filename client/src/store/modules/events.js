import EventsServise from '@/services/EventsServise'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {

  },
  mutations: {
    setEvents (state, events) {
      state.items = events
    }
  },
  actions: {
    async getEvents ({commit}) {
      let responce = await EventsServise.fetchEvents()
      let events = responce.data.events
      commit('setEvents', events)
    }
  }
}
