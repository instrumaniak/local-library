import React, { Component } from 'react'
import { URL } from '../services/api-endpoints'
import { postData } from '../services'
import isEmpty from 'lodash.isempty'

class PageAuthorCreate extends Component {
  state = {
    first_name: '',
    family_name: '',
    date_of_birth: '',
    date_of_death: '',
    isError: false,
    submit_message: ''
  }

  handleInputChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const {
      first_name,
      family_name,
      date_of_birth,
      date_of_death,
    } = this.state

    postData(URL.author_create, {
      first_name,
      family_name,
      date_of_birth,
      date_of_death
    })
      .then(data => {
        console.log(data)

        if(isEmpty(data.errors)) {
          this.setState({
            first_name: '',
            family_name: '',
            date_of_birth: '',
            date_of_death: '',
            isError: false,
            submit_message: `Created Author: ${data.author.name}`
          })
        }
        else {
          this.setState({
            isError: true,
            submit_message: ''
          })
        }
      })
  }

  render() {
    const {
      first_name,
      family_name,
      date_of_birth,
      date_of_death,
      isError,
      submit_message
    } = this.state

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
              value={first_name}
              onChange={this.handleInputChange}
            />
            <br/>
            <label>Family Name:</label>
            <input
              className='form-control'
              placeholder='Family Name'
              name='family_name'
              value={family_name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label>Date of Birth:</label>
            <input
              className='form-control'
              type='date'
              name='date_of_birth'
              value={date_of_birth}
              onChange={this.handleInputChange}
            />
            <br/>
            <label>Date of Death:</label>
            <input
              className='form-control'
              type='date'
              name='date_of_death'
              value={date_of_death}
              onChange={this.handleInputChange}
            />
          </div>
          <br/>

          { isError && <p>Error: Server rejected input.</p> }
          { submit_message && <p>{submit_message}</p> }

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
