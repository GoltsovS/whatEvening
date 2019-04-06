const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const config = require('./config/config')
const path = require('path')

mongoose.Promise = global.Promise

// load environment variables
require('dotenv').config()

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(flash())
app.use(express.static(path.join(__dirname, '../client/dist')))

// routes
app.use(require('./routes/index.js'))
app.use(require('./routes/events.js'))
app.use(require('./routes/user.js'))

mongoose.set('debug', true) //only for dev
mongoose.connect(process.env.DB_URI)
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))
