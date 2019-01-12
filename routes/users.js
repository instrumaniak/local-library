const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  const { id } = req.params
  res.send('You are so ' + id)
})

module.exports = router
