const express = require('express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const config = require('./config/config')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user-model')
const bCrypt = require('bcrypt')

mongoose.Promise = global.Promise

// load environment variables
require('dotenv').config()

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(flash())

// Passport init
app.use(expressSession({secret: 'mySercetKey', resave: true, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use(require('./routes/user.js'))
app.use(require('./routes/events.js'))

passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

var isValidPassword = function(user, password) {
  return bCrypt.compareSync(password, user.password)
}

// generate hash using bCrypt
var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

mongoose.set('debug', true) //only for dev
mongoose.connect(process.env.DB_URI)
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port,
      () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))

// login strategy
passport.use('login', new LocalStrategy({
  passReqToCallback: true
},
function(req, username, password, done) {
  console.log(done)
  User.findOne({
      'username': username
    },
    function(err, user) {
      if (err) {
        console.log('успешный вход')
        return done(err)
      }
      if (!user) {
        console.log('User not found with username ' + username)
        return done(null, false , req.flash('message', 'User Not found.'))
      }
      if (!isValidPassword(user, passport)) {
        console.log('Invalid Password')
        return done(null, false, req.flash('message', 'Invalid Password'))
      }
      return done(null, user)
    })
}
))

// sugnup strategy
passport.use('signup', new LocalStrategy({
  passReqToCallback: true
},
function(req, username, password, done) {
  findOrCreateUser = function() {
    User.findOne({'username': username}, function(err, user) {
      if (err) {
        console.log('Error in SignUp: ' + err)
        return done(err)
      }
      if (user) {
        alert('User already exists')
        return done(null, false, req.flash('message', 'User Already Exists'))
      } else {
        var newUser = new User()
        newUser.username = username
        newUser.password = createHash(password)
        newUser.email = req.param('email')

        // save the user
        newUser.save(function(err) {
          if (err) {
            console.log('Error in Saving user: ' + err)
            throw err
          }
          console.log('User Registration successful')
          return done(null, newUser)
        })
      }
    })
  }

  process.nextTick(findOrCreateUser)
}
))