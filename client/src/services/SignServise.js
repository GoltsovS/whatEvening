import api from '@/services/api'

export default {
  signIn (params) {
    return api().post('user', params)
  }
}
