/**
 *  User Controllers
 */

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const config = require('../config/db')

/**
 *  Register a user
 */

exports.register = (req, res) => {
  const { name, username, email, password } = req.body

  let newUser = new User({
    name,
    username,
    email,
    password,
  })

  // Hash user password then save
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err

      newUser.password = hash
      newUser.save((err) => {
        if (err) {
          let message = ''
          if (err.errors.username) message = 'Username is already taken'
          if (err.errors.email) message += ' Email already exists'

          return res.json({
            success: false,
            message,
          })
        } else {
          return res.json({
            success: true,
            message: 'User registration is successful.',
          })
        }
      })
    })
  })
}

/**
 *  Login a user & send jwt token
 */

exports.login = (req, res) => {
  const { username, password } = req.body

  User.findOne({ username }).exec((err, user) => {
    if (err) throw err

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found',
      })
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err

      if (isMatch) {
        const token = jwt.sign(
          {
            type: 'user',
            data: {
              _id: user._id,
              username: user.username,
              name: user.name,
              email: user.email,
            },
          },
          config.secret,
          {
            expiresIn: 604800, // 1 week
          }
        )

        return res.json({
          success: true,
          token: 'JWT ' + token,
        })
      } else {
        return res.json({
          success: false,
          message: 'Wrong password',
        })
      }
    })
  })
}

exports.profile = (req, res) => {
  return res.json({
    message: 'Hello world!',
  })
}
