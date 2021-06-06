import React, { useState, useEffect } from 'react'
import { URL } from '../services/api-endpoints'
import { getData, postData } from '../services'
import isEmpty from 'lodash.isempty'

const PageBookCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    isbn: '',
    genre: [],
  })

  const [authorList, setAuthorList] = useState([])
  const [genreList, setGenreList] = useState([])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  useEffect(() => {
    getData(URL.authors).then((data) => setAuthorList(data.author_list))
    getData(URL.genres).then((data) => setGenreList(data.genre_list))
  }, [])

  return (
    <div>
      <h1>Create new book</h1>
      <form>
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
            className="form-control"
            placeholder="Select author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          >
            {authorList.map((author) => (
              <option value={author.id}>{author.name}</option>
            ))}
          </select>
        </div>
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
          {genreList.map((genre) => (
            <label>
              <input type="checkbox" /> {genre.name} &nbsp;&nbsp;
            </label>
          ))}
        </div>
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default PageBookCreate
