import React from 'react'

const PageLogIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <div>
      <h1>Login</h1>
      <div className="mt-4 ll-page-form-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username (ID):</label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="Enter your Username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter your Password"
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PageLogIn
