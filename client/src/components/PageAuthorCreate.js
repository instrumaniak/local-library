import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { URL } from '../services/api-endpoints'
import { postData } from '../services'
import isEmpty from 'lodash.isempty'
import WindowTitle from './WindowTitle'
import { withFormErrors } from '../hooks/useFormErrors'

class PageAuthorCreate extends Component {
  state = {
    first_name: '',
    family_name: '',
    date_of_birth: '',
    date_of_death: '',
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { first_name, family_name, date_of_birth, date_of_death } = this.state
    const { setFormErrors, history } = this.props

    postData(URL.author_create, {
      first_name,
      family_name,
      date_of_birth,
      date_of_death,
    }).then((data) => {
      if (isEmpty(data.errors)) {
        this.setState({
          first_name: '',
          family_name: '',
          date_of_birth: '',
          date_of_death: '',
        })
        setFormErrors([])
        history.push(`/catalog/author/${data.id}`)
      } else {
        setFormErrors(data.errors)
      }
    })
  }

  render() {
    const { first_name, family_name, date_of_birth, date_of_death } = this.state

    const { hasFormValidationError, getParamError } = this.props

    return (
      <div>
        <WindowTitle title="Create Author" />
        <h1>Create Author</h1>
        <form
          onSubmit={this.handleSubmit}
          className="mt-4 ll-page-form-container has-validation"
        >
          <div className="mb-3">
            <label className="form-label">First Name:</label>
            <input
              className={`form-control ${hasFormValidationError('first_name')}`}
              placeholder="First Name"
              name="first_name"
              value={first_name}
              onChange={this.handleInputChange}
            />
            <div className="invalid-feedback">
              {getParamError('first_name')?.msg}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Family Name:</label>
            <input
              className={`form-control ${hasFormValidationError(
                'family_name'
              )}`}
              placeholder="Family Name"
              name="family_name"
              value={family_name}
              onChange={this.handleInputChange}
            />
            <div className="invalid-feedback">
              {getParamError('family_name')?.msg}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth:</label>
            <input
              className={`form-control ${hasFormValidationError(
                'date_of_birth'
              )}`}
              type="date"
              name="date_of_birth"
              value={date_of_birth}
              onChange={this.handleInputChange}
            />
            <div className="invalid-feedback">
              {getParamError('date_of_birth')?.msg}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Death:</label>
            <input
              className={`form-control ${hasFormValidationError(
                'date_of_death'
              )}`}
              type="date"
              name="date_of_death"
              value={date_of_death}
              onChange={this.handleInputChange}
            />
            <div className="invalid-feedback">
              {getParamError('date_of_death')?.msg}
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(withFormErrors(PageAuthorCreate))
