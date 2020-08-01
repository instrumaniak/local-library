/**
 *  Local Library API Server
 */

// import required packages
const createError = require('http-errors')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')

// import routes
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const catalogRouter = require('./routes/catalog')

// import config
const config = require('./config/db')

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

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(passport.initialize())

// setup passport for JWT
require('./config/passport')(passport)

// serve static
//app.use(express.static(path.join(__dirname, 'public')))

// setup routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/catalog', catalogRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
