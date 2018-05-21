const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/user', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}))

router.get('/signout', function(req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router