const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const BookInstanceSchema = new Schema({
  book: { // reference to the associated book
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: [
      'Available',
      'Maintenance',
      'Loaned',
      'Reserved'
    ],
    default: 'Maintenance'
  },
  due_back: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for bookinstance's URL
BookInstanceSchema
  .virtual('url')
  .get(function() {
    return `/catalog/bookinstance/${this._id}`
  })

BookInstanceSchema
  .virtual('due_back_formatted')
  .get(function() {
    return moment(this.due_back).format('MMMM Do, YYYY')
  })

// Export the model
module.exports = mongoose.model('BookInstance', BookInstanceSchema)
