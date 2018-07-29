import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://what-evening.auth0.com/api/v2/users/USER_ID'
  })
}
