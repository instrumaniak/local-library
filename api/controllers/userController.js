/**
 *  User Controllers
 */
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const config = require('../config')

/**
 *  Register a user
 */

exports.register = [
  body('name', 'User fullname is required')
    .isString()
    .withMessage('Invalid data. Should be string.')
    .trim()
    .isLength({ min: 4 })
    .withMessage('User fullname should be min. 4 charaters')
    .escape(),
  body('username', 'Username / id is requred ')
    .isString()
    .withMessage('Invalid data. Should be string.')
    .trim()
    .isLength({ min: 3 })
    .withMessage('User ID should be min. 3 charaters')
    .escape(),
  body('email', 'Email is required')
    .isEmail()
    .withMessage('Valid email is required')
    .trim()
    .escape(),
  body('password', 'Password is required')
    .isString()
    .withMessage('Invalid data. Should be string.')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Password should be min. 4 charaters'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      })
    }

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
        if (err) return next(err)

        newUser.password = hash
        newUser.save((err) => {
          if (err) {
            let usererrors = []
            if (err.errors.username) {
              usererrors.push({
                param: 'username',
                msg: 'Username is already in use',
              })
            }
            if (err.errors.email) {
              usererrors.push({
                param: 'email',
                msg: 'Email is already in use',
              })
            }
            return res.status(400).json({
              success: false,
              message: 'Failed to create new user.',
              errors: usererrors,
            })
          } else {
            return res.status(201).json({
              success: true,
              message: 'User registration is successful.',
            })
          }
        })
      })
    })
  },
]

/**
 *  Login a user & send jwt token
 */

exports.login = (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username }).exec((err, user) => {
    if (err) return next(err)

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found',
      })
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return next(err)

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
          config.JWT_SECRET,
          {
            expiresIn: config.JWT_EXPIRES_IN,
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
