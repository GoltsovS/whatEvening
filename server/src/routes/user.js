const express = require('express')
const router = express.Router()
const UserModel = require('../models/user-model')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwtsecret = "mysecretkey"
const jwt = require('jsonwebtoken')
const socketioJwt = require('socketio-jwt')
const socketIO = require('socket.io')
const crypto = require('crypto')

router.post('/user', async(ctx, next) => {
  try {
    ctx.body = await UserModel.create(ctx.request.body)
  }
  catch (err) {
    ctx.status = 400
    ctx.body = err
  }
})

router.post('/login', async(ctx, next) => {
  await passport.authenticate('local', function (err, user) {
    if (user == false) {
      ctx.body = "Login failed"
    } else {
      const payload = {
        id: user.id,
        displayName: user.displayName,
        email: user.email
      }
      const token = jwt.sign(payload, jwtsecret)

      ctx.body = {user: user.displayName, token: 'JWT ' + token}
    }
  })(ctx, next)
})

router.get('/custom', async(ctx, next) => {
  await passport.authenticate('jwt', function (err, user) {
    if (user) {
      ctx.body = "hello" + user.displayName
    } else {
      ctx.body = "No such user"
      console.log("err", err)
    }
  })(ctx, next)
})

passport.use(new LocalStrategy({
  usernameFileld: 'email',
  passwordField: 'password',
  session: false
},
function (email, password, done) {
  User.findOne({email}, (err, user) => {
    if (err) {
      return done(err)
    }

    if (!user || !user.checkPassword(password)) {
      return done(null, false, {message: 'Нет такого пользователя или пароль невереню'})
    }
    return done(null, user)
  })
}))

// jwt wait
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: jwtsecret
}

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(err)
    }
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
}))

module.exports = router