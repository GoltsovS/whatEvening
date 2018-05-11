const express = require('express')
const router = express.Router()
const Event = require('../models/event-model')

router.post('/events', (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description
  })
  event.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        success: true,
        message: `Event with ID_${data._id} saved successfully!`
      })
    }
  })
})

router.get('/events', (req, res) => {
  Event.find({}, 'title description', (err, events) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ events: events })
    }
  }).sort({ _id: -1 })
})

module.exports = router