
import api from '@/services/api'

export default {
  getAccessToken () {
    return api().get('user/')
  },
  updateUserProfile (params) {
    return api().post('/user', params)
  }
}
