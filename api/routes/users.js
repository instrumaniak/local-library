const express = require('express')
const router = express.Router()
const { requiresAuthentication } = require('../middlewares/auth')
const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)

/**
 *  Get authenticated user profile
 */

router.get('/profile', requiresAuthentication, userController.profile)

module.exports = router
