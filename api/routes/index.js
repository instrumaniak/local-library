const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const usersRouter = require('./users')
const catalogRouter = require('./catalog')

const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'LocalLibrary',
      version: '1.0.0',
      description: 'API Documentation',
    },
    basePath: '/api',
  },
  apis: ['./routes/*.js'], // files containing annotations as above
}

const swaggerSpec = swaggerJsdoc(options)

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User login/signup & other user management
 */

router
  .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use('/catalog', catalogRouter)
  .use('/users', usersRouter)

module.exports = router
