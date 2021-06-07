const async = require('async')
const { body, validationResult } = require('express-validator')

// import models
const Book = require('../models/book')
const Author = require('../models/author')
const Genre = require('../models/genre')
const BookInstance = require('../models/bookinstance')

exports.index = (req, res) => {
  async.parallel(
    {
      book_count(callback) {
        Book.countDocuments({}, callback) // find all
      },
      book_instance_count(callback) {
        BookInstance.countDocuments({}, callback)
      },
      book_instance_available_count(callback) {
        BookInstance.countDocuments({ status: 'Available' }, callback)
      },
      author_count(callback) {
        Author.countDocuments({}, callback)
      },
      genre_count(callback) {
        Genre.countDocuments({}, callback)
      },
    },

    (err, results) => {
      res.json({
        title: 'Local Library Home',
        error: err,
        data: results,
      })
    }
  )
}

// Display list of all books.
exports.book_list = (req, res, next) => {
  Book.find({}, 'title author')
    .populate('author')
    .exec((err, list_books) => {
      if (err) return next(err)

      res.json({
        title: 'Book List',
        book_list: list_books,
      })
    })
}

// Display detail page for a specific book.
exports.book_detail = (req, res, next) => {
  const { id } = req.params

  async.parallel(
    {
      book(callback) {
        Book.findById(id).populate('author').populate('genre').exec(callback)
      },
      book_instance(callback) {
        BookInstance.find({ book: id }).exec(callback)
      },
    },

    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.book == null) {
        // No results
        const err = new Error('Book not found')
        err.status = 404
        return next(err)
      }

      res.json({
        title: 'Title',
        book: results.book,
        book_instances: results.book_instance,
      })
    }
  )
}

// Display book create form on GET.
exports.book_create_get = function (req, res, next) {
  // Get all authors & genres, which we can use for adding to our book
  async.parallel(
    {
      authors(callback) {
        Author.find(callback)
      },

      genres(callback) {
        Genre.find(callback)
      },
    },

    (err, { authors, genres }) => {
      if (err) return next(err)

      res.json({
        title: 'Create Book',
        authors,
        genres,
      })
    }
  )
}

// Handle book create on POST.
exports.book_create_post = [
  // Convert the genre to an array
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = []
      else req.body.genre = new Array(req.body.genre)
    }
    next()
  },

  // Validate & Sanitize fields
  body('title', 'Title must not be empty').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('summary', 'Summary must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req)

    // Create a Book object with escaped & trimmed data
    const { title, author, summary, isbn, genre } = req.body

    let book = new Book({
      title,
      author,
      summary,
      isbn,
      genre,
    })

    if (!errors.isEmpty()) {
      // There are errors, just send those
      res.json({ title: 'Create Book', errors: errors.array() })
      return
    } else {
      // Data is valid so save book.
      book.save((err) => {
        if (err) return next(err)

        return res.status(201).json({
          message: 'success',
          book_id: book._id,
          errors: [],
        })
      })
    }
  },
]

// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete GET')
}

// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete POST')
}

// Display book update form on GET.
exports.book_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update GET')
}

// Handle book update on POST.
exports.book_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update POST')
}
