/**
 *  User Controllers
 */

const { body } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const config = require('../config')
const { checkValidationErrors } = require('../middlewares/validationErrors')

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
    .isLength({ min: 4 })
    .withMessage('Password should be min. 4 charaters')
    .escape(),
  body('role', 'Role is required')
    .isString()
    .withMessage('Invalid data. Should be string.')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Role should not be empty')
    .escape(),

  checkValidationErrors,

  (req, res, next) => {
    const { name, username, email, password, role } = req.body

    let newUser = new User({
      name,
      username,
      email,
      password,
      role,
      isActivated: role === 'Reader', // auto-activate 'Reader' accounts
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
            if (err.errors.role) {
              usererrors.push({
                param: 'role',
                msg: 'Invalid role. Must be one of: Reader, Staff, Admin',
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

exports.login = [
  body('username', 'Username / id is requred ')
    .isString()
    .withMessage('Invalid data. Should be string.')
    .trim()
    .isLength({ min: 3 })
    .withMessage('User ID should be min. 3 charaters')
    .escape(),

  body('password', 'Password is required')
    .isString()
    .withMessage('Invalid data. Should be string.')
    .isLength({ min: 4 })
    .withMessage('Password should be min. 4 charaters')
    .escape(),

  checkValidationErrors,

  (req, res, next) => {
    const { username, password } = req.body

    User.findOne({ username }).exec((err, user) => {
      if (err) return next(err)

      if (!user) {
        return res.status(400).json({
          success: false,
          param: 'username',
          msg: 'User not found',
        })
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return next(err)

        if (isMatch) {
          const token = jwt.sign(
            {
              type: 'user',
              data: {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role,
                isActivated: user.isActivated,
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
            param: 'password',
            msg: 'Wrong password',
          })
        }
      })
    })
  },
]

exports.profile = (req, res) => {
  return res.json({
    message: 'Hello world!',
  })
}
