const jwt = require('jsonwebtoken')
const { secret } = require('../config/db')

exports.requiresAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization
  let result
  if (authHeader) {
    const token = authHeader.split(' ')[1] // extract token
    try {
      result = jwt.verify(token, secret)
      console.log(result)
      req.decodedJWT = result
      next()
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token',
      })
    }
  } else {
    return res.status(403).json({
      success: false,
      message: 'No authorization header found',
    })
  }
}
