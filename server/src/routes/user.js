const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/login', passport.authenticate('login', {
  successRedirect: '/events',
  failureRedirect: '/user',
  failureFlash: true
}))

router.post('/user', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/user',
  failureFlash: true
}))

router.get('/signout', function(req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router