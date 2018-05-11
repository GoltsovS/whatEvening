const express = require('express')
const router = express.Router()
const Event = require('../models/event-model')

router.post('/events', (req, res) => {
  const event = new Post({
    title: req.body.title,
    description: req.body.description
  })
  event.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        success: true,
        message: `Post with ID_${data._id} saved successfully!`
      })
    }
  })
})