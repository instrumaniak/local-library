const mongoose = require('mongoose')

const { Schema } = mongoose

const GenreSchema = new Schema({
  name: {
     type: String,
     required: true,
     min: 3,
     max: 100
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for genre's URL
GenreSchema
  .virtual('url')
  .get(function() {
    return `/catalog/genre/${this._id}`
  })

// Export model
module.exports = mongoose.model('Genre', GenreSchema)