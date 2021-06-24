import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { URL } from '../services/api-endpoints'
import { getData, postData } from '../services'
import isEmpty from 'lodash.isempty'
import WindowTitle from './WindowTitle'

const PageBookCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    isbn: '',
  })

  const [authorList, setAuthorList] = useState([])
  const [genreList, setGenreList] = useState([])
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
        setHasError(true)
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
          id: genre.id,
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
      <form onSubmit={handleSubmit} className="mt-4 ll-page-form-container">
        <div className="form-group">
          <label>Title:</label>
          <input
            className="form-control"
            placeholder="Name of book"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <br />
          <label>Author:</label>
          <select
            className="form-select"
            placeholder="Select author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          >
            <option value="">Please Select</option>
            {authorList.map((author, index) => (
              <option value={author.id} key={index}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="form-group">
          <label>Summary:</label>
          <textarea
            className="form-control"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            rows={6}
          />
          <br />
          <label>ISBN:</label>
          <input
            className="form-control"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <label>Genre:</label>
        <div>
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
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      {hasError && <span>Error occured</span>}
    </div>
  )
}

export default PageBookCreate
