import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { URL } from '../services/api-endpoints'
import { getData, postData } from '../services'
import isEmpty from 'lodash.isempty'
import WindowTitle from './WindowTitle'
import useFormErrors from '../hooks/useFormErrors'

const PageBookInstanceCreate = () => {
  const [formData, setFormData] = useState({
    book: '',
    imprint: '',
    status: '',
    due_back: '',
  })

  const [bookList, setBookList] = useState([])
  const { setFormErrors, getParamError, hasFormValidationError } =
    useFormErrors()
  const history = useHistory()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postData(URL.bookinstance_create, {
      book: formData.book,
      imprint: formData.imprint,
      status: formData.status,
      due_back: formData.due_back,
    }).then((data) => {
      if (isEmpty(data.errors)) {
        setFormData({
          book: '',
          imprint: '',
          status: '',
          due_back: '',
        })
        history.push(`/catalog/bookinstance/${data.bookinstance_id}`)
      } else {
        setFormErrors(data.errors)
      }
    })
  }

  useEffect(() => {
    getData(URL.books).then((data) => setBookList(data.book_list))
  }, [])

  const statusList = ['Available', 'Maintenance', 'Loaned', 'Reserved']

  return (
    <div>
      <WindowTitle title="Create Book Instance" />
      <h1>Create Book Instance</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 ll-page-form-container has-validation"
      >
        <div className="mb-3">
          <label className="form-label">Book:</label>
          <select
            className={`form-select ${hasFormValidationError('book')}`}
            placeholder="Select book"
            name="book"
            value={formData.book}
            onChange={handleInputChange}
          >
            <option value="">Please Select</option>
            {bookList.map((book, index) => (
              <option value={book.id} key={index}>
                {book.title}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{getParamError('book')?.msg}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Imprint:</label>
          <input
            className={`form-control ${hasFormValidationError('imprint')}`}
            name="imprint"
            value={formData.imprint}
            onChange={handleInputChange}
          />
          <div className="invalid-feedback">
            {getParamError('imprint')?.msg}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Date when book will be available:
          </label>
          <input
            className={`form-control ${hasFormValidationError('due_back')}`}
            type="date"
            name="due_back"
            value={formData.due_back}
            onChange={handleInputChange}
          />
          <div className="invalid-feedback">
            {getParamError('due_back')?.msg}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select
            className={`form-select ${hasFormValidationError('status')}`}
            placeholder="Select status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="">Please Select</option>
            {statusList.map((status, index) => (
              <option value={status} key={index}>
                {status}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{getParamError('status')?.msg}</div>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default PageBookInstanceCreate
