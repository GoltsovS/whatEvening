const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user-model')
const VerifyToken = require('../middleware/VerifyToken')

// register user
router.post('/api/register', (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

  user.save((err, user) => {
    if (err) return res.status(500).send('Ошибка регистрации, попробуйте позже.')

    let token = jwt.sign({id: user._id}, process.env.AUTH_SECRET, {
      expiresIn: 43200
    })

    res.status(200).send({success: true, token: token})
  })
})

router.get('/api/user', VerifyToken, (req, res, next) => {
  User.findById(req.userId, {password: 0}, (err, user) => {
    if (err) return res.status(500).send("Проблемы с поиском пользователя.");
    if (!user) return res.status(404).send("Пользователь не найден.");

    res.status(200).send(user)
  })
})

router.put('/api/user', VerifyToken, (req, res, next) => {
  User.findById(req.userId, (err, user) => {
    if (err) return res.status(500).send("Проблемы с поиском пользователя.")
    if (!user) return res.status(404).send("Проблемы с профилем.")
    
    user.adress = req.body.adress ? req.body.adress : null
    user.city = req.body.city ? req.body.city : null

    user.save(err => {
      if (err) {
        res.sendStatus(500).send({
          success: false,
          message: "Ошибка сервера."
        })
      } else {
        res.status(200).send({
          success: true,
          message: "Профиль успешно обновлен."
        })
      }
    })
  })
})

router.post('/api/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return res.status(500).send({
      auth: false,
      message: 'Ошибка на сервере.'
    })
    if (!user) return res.status(404).send({
      auth: false,
      message: 'Пользователь не найден.'
    })

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) return res.status(401).send({
      auth: false,
      token: null,
      message: 'Пароль неверен.'
    })

    let token = jwt.sign({id: user._id}, process.env.AUTH_SECRET, {
      expiresIn: 43200
    })

    res.cookie('token', token)
    res.status(200).send({
      auth: true,
      token: token
    })
  })
})

router.get('/api/logout', (req, res) => {
  res.clearCookie('token')
  res.status(200).send({
    auth: false,
    token: null
  })
})

module.exports = router
