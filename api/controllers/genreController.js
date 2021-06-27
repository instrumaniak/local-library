const async = require('async')
const { body } = require('express-validator')

const Genre = require('../models/genre')
const Book = require('../models/book')
const { checkValidationErrors } = require('../middlewares/validationErrors')

/**
 *  Display list of all Genre.
 */

exports.genre_list = function (req, res, next) {
  Genre.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'genre',
        as: 'books',
      },
    },
    {
      $project: {
        name: '$name',
        book_count: { $size: '$books' },
      },
    },
  ])
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
  body('name', 'Genre name required')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Genre name length should be between 3 & 100 characters')
    .escape(),

  checkValidationErrors,

  // Process request after validation and sanitization
  (req, res, next) => {
    // Check if Genre with same name already exists
    Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
      if (err) {
        return next(err)
      }
      if (found_genre) {
        return res.status(400).json({
          success: false,
          errors: [
            {
              param: 'name',
              msg: 'Genre already exists',
            },
          ],
        })
      } else {
        // Create a genre object with escaped and trimmed data
        let genre = new Genre({
          name: req.body.name,
        })
        genre.save((err) => {
          if (err) {
            return res.status(400).json({
              success: false,
              errors: [
                {
                  param: 'name',
                  msg: 'Failed to save genre',
                },
              ],
            })
          }

          return res.status(201).json({
            success: true,
            message: 'Genre created successfully',
            id: genre._id,
            name: genre.name,
          })
        })
      }
    })
    // }
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
