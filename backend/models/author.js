const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    max: 100
  },
  family_name: {
    type: String,
    required: true,
    max: 100
  },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function() {
    return `${this.family_name}, ${this.first_name}`
  })

// Virtual for author's lifespan
AuthorSchema
  .virtual('lifespan')
  .get(function() {
    let birth = this.date_of_birth.getYear()
    let death = this.date_of_death ?
                this.date_of_death.getYear() :
                (new Date()).getYear()
    return (death - birth).toString()
  })

// Virtual for authro's URL
AuthorSchema
  .virtual('url')
  .get(function() {
    return `/catalog/author/${this._id}`
  })

// Export model
module.exports = mongoose.model('Author', AuthorSchema)
