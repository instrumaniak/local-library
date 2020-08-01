const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')
const config = require('../config/db')

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
opts.secretOrKey = config.secret

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.data._id, (err, user) => {
      if(err) return done(err, false)
      if(user) return done(null, user)

      return done(null, false)
    })
  }))
}
