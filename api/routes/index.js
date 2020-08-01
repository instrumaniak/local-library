const router = require('express').Router()
const usersRouter = require('./users')
const catalogRouter = require('./catalog')

router.use('/catalog', catalogRouter).use('/users', usersRouter)

module.exports = router
