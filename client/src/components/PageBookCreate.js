import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { URL } from '../services/api-endpoints'
import { getData, postData } from '../services'
import isEmpty from 'lodash.isempty'
import WindowTitle from './WindowTitle'
import useFormErrors from '../hooks/useFormErrors'

const PageBookCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    isbn: '',
  })

  const [authorList, setAuthorList] = useState([])
  const [genreList, setGenreList] = useState([])

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
    postData(URL.book_create, {
      title: formData.title,
      author: formData.author,
      summary: formData.summary,
      isbn: formData.isbn,
      genre: genreList
        .filter((genre) => genre.checked)
        .map((genre) => genre.id),
    }).then((data) => {
      if (isEmpty(data.errors)) {
        setFormData({
          title: '',
          author: '',
          summary: '',
          isbn: '',
        })
        setGenreList(genreList.map((genre) => ({ ...genre, checked: false })))
        history.push(`/catalog/book/${data.book_id}`)
      } else {
        setFormErrors(data.errors)
      }
    })
  }

  const handleGenre = (id) => {
    const genreIndex = genreList.findIndex((genre) => genre.id === id)
    if (genreIndex > -1) {
      const genreListNew = genreList.map((genre) =>
        genre.id === id ? { ...genre, checked: !genre.checked } : genre
      )
      setGenreList(genreListNew)
    }
  }

  useEffect(() => {
    getData(URL.authors).then((data) => setAuthorList(data.author_list))
    getData(URL.genres).then((data) => {
      setGenreList(
        data.genre_list.map((genre) => ({
          id: genre._id,
          name: genre.name,
          checked: false,
        }))
      )
    })
  }, [])

  return (
    <div>
      <WindowTitle title="Create Book" />
      <h1>Create Book</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 mb-4 ll-page-form-container has-validation"
      >
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            className={`form-control ${hasFormValidationError('title')}`}
            placeholder="Name of book"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <div className="invalid-feedback">{getParamError('title')?.msg}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Author:</label>
          <select
            className={`form-select ${hasFormValidationError('author')}`}
            placeholder="Select author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          >
            <option value="">Please Select</option>
            {authorList.map((author, index) => (
              <option value={author._id} key={index}>
                {author.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{getParamError('author')?.msg}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Summary:</label>
          <textarea
            className={`form-control ${hasFormValidationError('summary')}`}
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            rows={6}
          />
          <div className="invalid-feedback">
            {getParamError('summary')?.msg}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN:</label>
          <input
            className={`form-control ${hasFormValidationError('isbn')}`}
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
          />
          <div className="invalid-feedback">{getParamError('isbn')?.msg}</div>
        </div>

        <div className="mb-4">
          <label className="form-label">Genre:</label>
          <div className={`${hasFormValidationError('genre')}`}>
            {genreList.map((genre, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={genre.checked}
                  onChange={() => handleGenre(genre.id)}
                />{' '}
                {genre.name} &nbsp;&nbsp;
              </label>
            ))}
          </div>
          <div className="invalid-feedback">{getParamError('genre')?.msg}</div>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default PageBookCreate
