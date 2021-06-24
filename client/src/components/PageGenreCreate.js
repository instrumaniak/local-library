import React, { Component } from 'react'
import { URL } from '../services/api-endpoints'
import { postData } from '../services'
import isEmpty from 'lodash.isempty'
import WindowTitle from './WindowTitle'

class PageGenreCreate extends Component {
  state = {
    genre_input: '',
    isError: false,
    submit_message: '',
  }
  handleInput = (e) => {
    this.setState({
      genre_input: e.target.value,
      isError: false,
      submit_message: '',
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { genre_input } = this.state

    postData(URL.genre_create, { name: genre_input }).then((data) => {
      if (isEmpty(data.errors)) {
        this.setState({
          genre_input: '',
          isError: false,
          submit_message: `Created genre: ${data.genre.name}`,
        })
      } else {
        this.setState({
          isError: true,
          submit_message: '',
        })
      }
    })
  }
  render() {
    const { genre_input, isError, submit_message } = this.state

    return (
      <div>
        <WindowTitle title="Create Genre" />
        <h1>Create Genre</h1>
        <form
          onSubmit={this.handleSubmit}
          className="mt-4 ll-page-form-container"
        >
          <div className="form-group">
            <label>Genre:</label>
            <input
              className="form-control"
              placeholder="Fantasy, Poetry etc."
              name="name"
              value={genre_input}
              onChange={this.handleInput}
            />
            <br />
            {isError && <p>Error: Server rejected input.</p>}
            {submit_message && <p>{submit_message}</p>}
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default PageGenreCreate
