const { body } = require('express-validator')
const BookInstance = require('../models/bookinstance')
const { transformModelErrors } = require('../helpers/errors')
const { checkValidationErrors } = require('../middlewares/validationErrors')

// Display list of all BookInstances.
exports.bookinstance_list = function (req, res, next) {
  BookInstance.find()
    .populate('book')
    .exec((err, list_bookinstances) => {
      if (err) return next(err)

      res.json({
        title: 'Book Instance List',
        bookinstance_list: list_bookinstances,
      })
    })
}

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function (req, res, next) {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if (err) return next(err)
      if (bookinstance == null) {
        // no results
        let err = new Error('Book copy not found')
        err.status = 404
        return next(err)
      }

      res.json({
        title: 'Book',
        bookinstance,
      })
    })
}

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create GET')
}

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  // validate & sanitize fields
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('status', 'Status is required').trim().isLength({ min: 1 }).escape(),
  body('due_back', 'Invalid date')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  checkValidationErrors,

  // process request after validation & sanitization
  (req, res) => {
    const { book, imprint, status, due_back } = req.body
    const bookinstance = new BookInstance({
      book,
      imprint,
      status,
      due_back,
    })
    bookinstance.save(function (err) {
      if (err) {
        return res.status(400).json(transformModelErrors(err.errors))
      }
      return res.status(201).json({
        message: 'Success',
        errors: [],
        bookinstance_id: bookinstance.id,
      })
    })
  },
]

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete GET')
}

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete POST')
}

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update GET')
}

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update POST')
}
