const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

const UserSchema = new Schema ({
  username: String,
  email: {
    type: String,
    unique: 'Такой e-mail уже существует'
  },
  password: String,
})

const User = mongoose.model('User', UserSchema)

module.exports = User