const express = require('express')
const router = express.Router()
const { requiresAuthentication } = require('../middlewares/auth')
const userController = require('../controllers/userController')

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user
 *     tags: [Users]
 *     consumes:
 *       -  application/json
 *     produces:
 *       -  application/json
 *     parameters:
 *       -  in: body
 *          name: body
 *          description: User registration Object
 *          required: true
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            role:
 *              type: string
 *     responses:
 *       201:
 *         description: Registration successful
 */
router.post('/register', userController.register)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login, to get new JWT Token
 *     description: Submit user login data to get JWT Token
 *     tags: [Users]
 *     consumes:
 *       -  application/json
 *     produces:
 *       -  application/json
 *     parameters:
 *       -  in: body
 *          name: payload
 *          required: true
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: Returns a JWT token data
 */
router.post('/login', userController.login)

/**
 *  Get authenticated user profile
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile data
 *     description: Get user profile data
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns a User profile data
 */
router.get('/profile', requiresAuthentication, userController.profile)

module.exports = router
