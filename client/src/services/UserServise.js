import api from '@/services/api'
import apiAuth0 from '@/services/apiAuth0'

export default {
  addNewUser (params) {
    return api().post('user', params)
  },
  updateUserLogo () {
    var settings = {
      'async': true,
      'crossDomain': true,
      'url': 'https://what-evening.auth0.com/api/v2/users/USER_ID',
      'method': 'PATCH',
      'headers': {
        'authorization': 'Bearer ABCD',
        'content-type': 'application/json'
      },
      'processData': false,
      'data': '{\'user_metadata\': {\'picture\': \'https://pp.userapi.com/c619728/v619728593/f667/5U5SYPfRqas.jpg\'}}'
    }
    return apiAuth0().post(settings)
  }
}
