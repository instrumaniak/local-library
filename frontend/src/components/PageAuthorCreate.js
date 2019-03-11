import React, { Component } from 'react'
import { URL } from '../services/api-endpoints'
import { postData } from '../services'

class PageAuthorCreate extends Component {
  state = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    date_of_death: ''
  }

  handleInputChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { first_name, last_name, date_of_birth, date_of_death} = this.state

    postData(URL.author_create, {
      first_name,
      last_name,
      date_of_birth,
      date_of_death
    })
      .then(data => {
        console.log(data)
      })
  }

  render() {
    return (
      <div>
        <h1>Create new Author</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>First Name:</label>
            <input
              className='form-control'
              placeholder='First Name'
              name='first_name'
            />
            <br/>
            <label>Family Name:</label>
            <input
              className='form-control'
              placeholder='Last Name'
              name='last_name'
            />
          </div>
          <div className='form-group'>
            <label>Date of Birth:</label>
            <input
              className='form-control'
              type='date'
              name='date_of_birth'
            />
            <br/>
            <label>Date of Death:</label>
            <input
              className='form-control'
              type='date'
              name='date_of_death'
            />
          </div>
          <button
            className='btn btn-primary'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default PageAuthorCreate
