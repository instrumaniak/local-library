const express = require('express')
const router = express.Router()
const passport = require('passport')

const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)

/**
 *  Get authenticated user profile
 */

router.get('/profile',
  passport.authenticate('jwt', { session: false }),
  userController.profile
)

module.exports = router
