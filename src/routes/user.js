const express = require('express')
const router = express.Router()
const request = require('request')
var authToken = ''

// get token mashine to mashine from Auth0
router.get('/user', (req,res) => {
  var tokenOptionsBody = JSON.stringify({
    "client_id": process.env.AUTH0_CLIENT_ID,
    "client_secret": process.env.AUTH0_CLIENT_SECRET,
    "audience": "https://" + process.env.AUTH_API_URL + "/api/v2/",
    "grant_type": "client_credentials"
  })
  var options = {
    method: 'POST',
    url: 'https://' + process.env.AUTH_API_URL + '/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: tokenOptionsBody
  }

  request(options, function (error, response, body) {
    if (error) {
      throw new Error(error)
    } else {
      authToken = JSON.parse(body).access_token
      res.send(body)
    }
  })
})

// send metadata to Auth0
router.post('/user', (req, res) => {
  var options = { method: 'PATCH',
    url: 'https://' + process.env.AUTH_API_URL + '/api/v2/users/' + req.body.userId,
    headers: { 'content-type': 'application/json',
               authorization: 'Bearer ' + authToken },
    body: { user_metadata: { city: req.body.city, adress: req.body.adress } },
    json: true
  }
  console.log(options)

  request(options, function (error, response, body) {
    if (error) {
      throw new Error(error)
    } else {
      res.send({
        success: true,
        message: `User update`
      })
    }
  })
})
module.exports = router
