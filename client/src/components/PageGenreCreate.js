import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { URL } from '../services/api-endpoints'
import { postData } from '../services'
import isEmpty from 'lodash.isempty'
import WindowTitle from './WindowTitle'
import useFormErrors from '../hooks/useFormErrors'

const PageGenreCreate = () => {
  const [formData, setFormData] = useState({
    genre: '',
  })

  const { setFormErrors, getParamError, hasFormValidationError } =
    useFormErrors()

  const history = useHistory()

  const handleInput = (e) => {
    setFormData({
      genre: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    postData(URL.genre_create, { name: formData.genre }).then((data) => {
      if (isEmpty(data.errors)) {
        setFormData({
          genre: '',
        })
        setFormErrors([])
        history.push(`/catalog/genre/${data.id}`)
      } else {
        setFormErrors(data.errors)
      }
    })
  }

  return (
    <div>
      <WindowTitle title="Create Genre" />
      <h1>Create Genre</h1>
      <form onSubmit={handleSubmit} className="mt-4 ll-page-form-container">
        <div className="mb-3 has-validation">
          <label className="form-label">Genre:</label>
          <input
            className={`form-control ${hasFormValidationError('name')}`}
            placeholder="Fantasy, Poetry etc."
            name="name"
            value={formData.genre}
            onChange={handleInput}
          />
          <div className="invalid-feedback">{getParamError('name')?.msg}</div>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!formData.genre}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default PageGenreCreate
