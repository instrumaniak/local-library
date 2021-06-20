/**
 *  User model
 */

const mongoose = require('mongoose')
const { Schema } = mongoose
const uniqueValidator = require('mongoose-unique-validator')

// User schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: ['Reader', 'Staff', 'Admin'],
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', UserSchema)
