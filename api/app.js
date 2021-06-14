/**
 *  Local Library API Server
 */
require('dotenv').config()

// import required packages
const createError = require('http-errors')
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const mongoose = require('mongoose')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')

// import routes
const apiRouter = require('./routes/index')

// import config
const config = require('./config')

/**
 * Setup mongodb/mongoose
 */

mongoose
  .connect(config.MDB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log(err))

/**
 * Setup Express
 */

const app = express()

app.use(helmet())
app.use(compression())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// setup api routes
app.use('/api', apiRouter)

//Serve Static contents
app.use(express.static(path.resolve(__dirname, '../client/build')))

// catch anything else
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  return res.json({ errors: [err.message] })
})

module.exports = app
