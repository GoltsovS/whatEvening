import apiAuth0 from '@/services/apiAuth0'

export default {
  updateUserPicture (params) {
    return apiAuth0().patch(`${params.userId}`, { user_metadata: params.picture }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.JWT
      }
    })
  }
}
