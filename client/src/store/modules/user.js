import UserServise from '@/services/UserServise'

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
    }
  },
  actions: {
    getUserData ({commit}, data) {
      commit('setUserData', data)
    },
    setMetadata ({commit}, metadata) {
      commit('setMetadata', metadata)
    },
    async updateProfile ({commit}) {
      console.log(this.state.user)
      let data = await UserServise.updateUserProfile({
        city: this.state.user.metadata.city,
        adress: this.state.user.metadata.adress,
        userId: this.state.user.data.sub
      }).then(responce => {
        if (responce.data.success) {
          commit('setMetadata', data)
        }
      })
    }
  }
}
