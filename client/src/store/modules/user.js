
export default {
  namespaced: true,
  state: {
    data: [],
    metadata: {
      city: '',
      adress: ''
    }
  },
  getters: {
    getMetadata (state) {
      return state.data['http://localhost:8080/user_metadata']
    }
  },
  mutations: {
    setUserData (state, data) {
      state.data = data
    },
    setMetadata (state, metadata) {
      state.metadata = metadata
    },
    updateCity (state, city) {
      state.metadata.city = city
    },
    updateAdress (state, adress) {
      state.metadata.adress = adress
    }
  },
  actions: {
    getUserData ({commit}, data) {
      commit('setUserData', data)
    },
    setMetadata ({commit}, metadata) {
      commit('setMetadata', metadata)
    }
  }
}
