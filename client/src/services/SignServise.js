import api from '@/services/api'

export default {
  signIn (params) {
    return api().post('login', params)
  }
}
