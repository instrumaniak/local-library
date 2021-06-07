const async = require('async')
const { body, validationResult } = require('express-validator')

const Genre = require('../models/genre')
const Book = require('../models/book')

/**
 *  Display list of all Genre.
 */

exports.genre_list = function (req, res, next) {
  Genre.find({})
    .sort('name')
    .exec((err, genre_list) => {
      if (err) return next(err)

      res.json({
        title: 'Genre List',
        genre_list,
      })
    })
}

/**
 *  Display detail page for a specific Genre.
 */
exports.genre_detail = function (req, res, next) {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback)
      },
      genre_books(callback) {
        Book.find({ genre: req.params.id }).exec(callback)
      },
    },

    (err, results) => {
      if (err) return next(err)

      if (results.genre == null) {
        // No results
        let err = new Error('Genre not found')
        err.status = 404
        return next(err)
      }

      res.json({
        title: 'Genre Details',
        genre: results.genre,
        genre_books: results.genre_books,
      })
    }
  )
}

/**
 *  Display Genre create form on GET.
 */
exports.genre_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre create GET')
}

/**
 *  Handle Genre create on POST.
 */
exports.genre_create_post = [
  // Validate & sanitize
  body('name', 'Genre name required').isLength({ min: 1 }).trim().escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with
      // sanitized values/error messages
      res.json({
        title: 'Create Genre',
        //genre,
        errors: errors.array(),
      })
      return
    } else {
      // Data from the form is valid
      // Check if Genre with same name already exists
      Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
        if (err) {
          return next(err)
        }
        if (found_genre) {
          res.redirect(found_genre.url)
        } else {
          // Create a genre object with escaped and trimmed data
          let genre = new Genre({
            name: req.body.name,
          })
          genre.save((err) => {
            if (err) {
              return next(err)
            }

            // Genre saved, should go to genre detail page
            res.redirect(genre.url)
          })
        }
      })
    }
  },
]

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre delete GET')
}

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre delete POST')
}

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update GET')
}

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update POST')
}
