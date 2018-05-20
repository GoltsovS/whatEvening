import api from '@/services/api'

export default {
  addNewUser (params) {
    return api().post('user', params)
  }
}
