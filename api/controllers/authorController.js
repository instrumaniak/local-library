const async = require('async')
const { body, validationResult } = require('express-validator')

const Author = require('../models/author')
const Book = require('../models/book')

// Display list of all Authors
exports.author_list = function (req, res, next) {
  Author.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'author',
        as: 'books',
      },
    },
    {
      $sort: {
        first_name: 1,
      },
    },
    {
      $project: {
        name: { $concat: ['$first_name', ' ', '$family_name'] },
        book_count: { $size: '$books' },
      },
    },
  ]).exec((err, list_authors) => {
    if (err) return next(err)

    res.json({
      title: 'Author List',
      author_list: list_authors,
    })
  })
}

// Display detail page for a specific Author
exports.author_detail = function (req, res, next) {
  const { id } = req.params

  async.parallel(
    {
      author(callback) {
        Author.findById(id).exec(callback)
      },
      authors_books(callback) {
        Book.find({ author: id }, 'title summary').exec(callback)
      },
    },

    (err, results) => {
      if (err) return next(err)
      if (results.author == null) {
        let err = new Error('Author not found')
        err.status = 404
        return next(err)
      }

      res.json({
        title: 'Author Detail',
        author: results.author,
        author_books: results.authors_books,
      })
    }
  )
}

// Display Author create form on GET
exports.author_create_get = function (req, res) {
  res.json({ title: 'Create Author' })
}

// Handle Author create on POST
exports.author_create_post = [
  // Validate & sanitize fields
  body('first_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('First name is required')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.')
    .escape(),

  body('family_name')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Family name is required')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.')
    .escape(),

  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  body('date_of_death', 'Invalid date of death')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract validation errors from a request
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.json({
        title: 'Create Author',
        author: req.body,
        errors: errors.array(),
      })
      return
    } else {
      const { first_name, family_name, date_of_birth, date_of_death } = req.body

      let author = new Author({
        first_name,
        family_name,
        date_of_birth,
        date_of_death,
      })

      author.save((err) => {
        if (err) return next(err)

        // on success redirect to new author record
        res.redirect(author.url)
      })
    }
  },
]

// Display Author delete form on GET
exports.author_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete GET')
}

// Handle Author delete on POST
exports.author_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete POST')
}

// Display Author update form on GET
exports.author_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update GET')
}

// Handle Author update on POST
exports.author_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update POST')
}
