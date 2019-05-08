import UserService from '@/services/UserService'

export default {
  namespaced: true,
  state: {
    data: {},
    isAuth: false
  },
  getters: {
    isAuthenticated (state) {
      return state.isAuth
    }
  },
  mutations: {
    setUserData (state, userData) {
      state.data = userData
    },
    setAuth (state, isAuth) {
      state.isAuth = isAuth
    }
  },
  actions: {
    async getUserData ({commit}) {
      let responce = await UserService.getPersonInfo()
      let userData = responce.data
      commit('setUserData', userData)
    },
    setAuth ({commit}, auth) {
      commit('setAuth', auth)
    }
  }
}
