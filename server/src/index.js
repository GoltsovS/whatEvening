const express = require('express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const config = require('./config/config')

mongoose.Promise = global.Promise

// load environment variables
require('dotenv').config()

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(flash())

// routes
app.use(require('./routes/events.js'))

mongoose.set('debug', true) //only for dev
mongoose.connect(process.env.DB_URI)
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))

var request = require("request")

var options = { method: 'POST',
  url: 'https://what-evening.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"ax83lO9LAk4ddKR34lH3VqVj7aOIgXVp","client_secret":"nWw5SibCw1IcRjGFdIAuuxTxQEruq9VfK1dv6DoYCKe0HBlYM2wma0rjZMAPbL3S","audience":"https://what-evening.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error)

  console.log(body.access_token)
})