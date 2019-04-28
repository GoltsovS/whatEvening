const express = require('express')
const router = express.Router()
const Event = require('../models/event-model')

// save event
router.post('/api/events', (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    coords: {
      lat: req.body.coords.lat,
      lng: req.body.coords.lng
    },
    user: {
      id: req.body.user.id
    }
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
router.get('/api/events', (req, res) => {
  Event.find({}, 'title description coords user', (err, events) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ events: events })
    }
  }).sort({ _id: -1 })
})


// get 1 event
router.get('/api/events/:id', (req, res) => {
  Event.findById(req.params.id, 'title description coords user', (err, event) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(event)
    }
  })
})

// update 1 event
router.put('/api/events/:id', (req, res) => {
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
router.delete('/api/events/:id', (req, res) => {
  Event.remove({_id: req.params.id}, err => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router