const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
  access_token: {
    type: String
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User