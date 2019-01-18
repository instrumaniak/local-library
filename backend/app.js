/**
 *  Bootstraped using Express generator
 *  with SASS & EJS support
 */

// import required packages
const createError = require('http-errors')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')

// import routes
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const catalogRouter = require('./routes/catalog')


/**
 * Setup mongodb/mongoose
 */

const mongoDBURL = 'mongodb://localhost/local-library'
mongoose.connect(mongoDBURL, { useNewUrlParser: true })

mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', console.error.bind(
  console, 'MongoDB connection error:'
))


/**
 * Setup Express
 */

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}))

// setup routes
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/catalog', catalogRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app