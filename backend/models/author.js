const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

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
    // only calculate lifespan if both field data exist
    if( this.date_of_birth &&
        this.date_of_death ) {

      let birth = moment(this.date_of_birth).format('YYYY')
      let death = moment(this.date_of_death).format('YYYY')

      return `${birth} - ${death}`
    }
    else if(this.date_of_birth && !this.date_of_death) {
      let birth = moment(this.date_of_birth).format('YYYY')

      return `${birth} - `
    }
    else {
      return ''
    }
  })

// Virtual for authro's URL
AuthorSchema
  .virtual('url')
  .get(function() {
    return `/catalog/author/${this._id}`
  })

// Export model
module.exports = mongoose.model('Author', AuthorSchema)
