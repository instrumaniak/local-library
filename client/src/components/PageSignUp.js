import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { postData } from '../services'
import { URL } from '../services/api-endpoints'
import isEmpty from 'lodash.isempty'
import useFormErrors from '../hooks/useFormErrors'

const PageSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { setFormErrors, getParamError, hasFormValidationError } =
    useFormErrors()

  const history = useHistory()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postData(URL.user_signup, {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }).then((data) => {
      if (isEmpty(data.errors)) {
        setFormData({
          name: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
        setFormErrors([])
        history.push('/user/login')
      } else {
        setFormErrors(data.errors)
      }
    })
  }

  const isPasswordConfirmed =
    formData.password && formData.password === formData.confirmPassword

  return (
    <div className="ll-page-signup-container">
      <h1>Sign Up</h1>
      <p className="text-muted">
        <small>Create new user account</small>
      </p>
      <div className="mt-4 ll-page-form-container">
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3 has-validation">
            <label className="form-label">Full Name:</label>
            <input
              className={`form-control ${hasFormValidationError('name')}`}
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{getParamError('name')?.msg}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Username (ID):</label>
            <input
              className={`form-control ${hasFormValidationError('username')}`}
              type="text"
              name="username"
              placeholder="Enter your user id (will be needed for login)"
              value={formData.username}
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              {getParamError('username')?.msg}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              className={`form-control ${hasFormValidationError('email')}`}
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              {getParamError('email')?.msg}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              className={`form-control ${hasFormValidationError('password')}`}
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              {getParamError('password')?.msg}
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Confirm Password:</label>
            <input
              className={`form-control ${hasFormValidationError('password')}`}
              type="password"
              name="confirmPassword"
              placeholder="Re-Enter your Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isPasswordConfirmed}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PageSignUp
