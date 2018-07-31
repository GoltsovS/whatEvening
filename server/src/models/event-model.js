const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema ({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  coords: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  user: {
    id: String
  }
})

const EventModel = mongoose.model('events', EventSchema)

module.exports = EventModel