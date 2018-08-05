import axios from 'axios'

export default (token) => {
  return axios.create({
    baseURL: 'https://what-evening.auth0.com/api/v2/users/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
}
