const express = require('express')
const router = express.Router()
const Event = require('../models/event-model')

// save event
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

// get events
router.get('/events', (req, res) => {
  Event.find({}, 'title description', (err, events) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ events: events })
    }
  }).sort({ _id: -1 })
})

// get 1 event
router.get('/events/:id', (req, res) => {
  Event.findById(req.params.id, 'title description', (err, event) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(event)
    }
  })
})

// update 1 event
router.put('/events/:id', (req, res) => {
  Event.findById(req.params.id, 'title description', (err, event) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.title) {
        event.title = req.body.title
      }
      if (req.body.description) {
        event.description = req.body.description
      }
      event.save(err => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})

// delete event
router.delete('/events/:id', (req, res) => {
  Event.remove({_id: req.params.id}, err => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})
module.exports = router