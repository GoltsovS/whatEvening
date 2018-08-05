// import apiAuth0 from '@/services/apiAuth0'
import api from '@/services/api'

export default {
  getAccessToken () {
    return api().get('user/')
  },
  updateUserProfile (params) {
    // console.log(params)
    return api().post('/user', params)
  }
}
