import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { URL } from '../services/api-endpoints'
import { getData, postData } from '../services'
import isEmpty from 'lodash.isempty'
import WindowTitle from './WindowTitle'

const PageBookInstanceCreate = () => {
  const [formData, setFormData] = useState({
    book: '',
    imprint: '',
    status: '',
    due_back: '',
  })

  const [bookList, setBookList] = useState([])
  const [hasError, setHasError] = useState(false)

  const history = useHistory()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setHasError(false)
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
        setHasError(true)
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
      <form onSubmit={handleSubmit} className="mt-4 ll-page-form-container">
        <div className="form-group">
          <label>Book:</label>
          <select
            className="form-select"
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
        </div>
        <br />
        <div className="form-group">
          <label>Imprint:</label>
          <input
            className="form-control"
            name="imprint"
            value={formData.imprint}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <label>Date when book will be available:</label>
        <input
          className="form-control"
          type="date"
          name="due_back"
          value={formData.due_back}
          onChange={handleInputChange}
        />
        <br />
        <label>Status:</label>
        <select
          className="form-select"
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
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      {hasError && <span>Error occured</span>}
    </div>
  )
}

export default PageBookInstanceCreate
