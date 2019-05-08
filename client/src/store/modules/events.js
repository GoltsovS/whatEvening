import EventsService from '@/services/EventsService'

export default {
  namespaced: true,
  state: {
    items: [],
    currentEvent: []
  },
  getters: {
    currentEvent (state) {
      return state.currentEvent
    }
  },
  mutations: {
    setEvents (state, events) {
      state.items = events
    },
    setCurrentEvent (state, event) {
      state.currentEvent = event
    }
  },
  actions: {
    async getEvents ({commit}) {
      let responce = await EventsService.fetchEvents()
      let events = responce.data.events
      commit('setEvents', events)
    },
    setCurrentEvent ({commit}, event) {
      commit('setCurrentEvent', event)
    }
  }
}
