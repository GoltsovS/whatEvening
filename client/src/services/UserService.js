import api from './api'

export default {
  signUp (params) {
    return api().post('register', params)
  },
  signIn (params) {
    return api().post('login', params)
  },
  signOut () {
    return api().get('logout')
  },
  getPersonInfo () {
    return api().get('user')
  },
  updateUserProfile (params) {
    return api().put('user', params)
  }
}
