import React, { useState } from 'react'

const PageSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const isPasswordConfirmed =
    formData.password && formData.password === formData.confirmPassword

  return (
    <div>
      <h1>Sign Up</h1>
      <p className="text-muted">
        <small>Create new user account</small>
      </p>
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username (ID):</label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="Enter your user id (will be needed for login)"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Confirm Password:</label>
            <input
              className="form-control"
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
