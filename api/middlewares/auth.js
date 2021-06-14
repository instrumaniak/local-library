const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

exports.requiresAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization
  let result
  if (authHeader) {
    const token = authHeader.split(' ')[1] // extract token
    try {
      result = jwt.verify(token, JWT_SECRET)
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
