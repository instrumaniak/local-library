import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'

class PageBookInstanceDetail extends Component {
  state = {
    bookinstance: {}
  }
  componentDidMount() {
    const { id } = this.props.match.params

    getData(URL.bookinstance + id)
      .then(data => this.setState(data))
  }
  render() {
    const { bookinstance } = this.state

    if(!isEmpty(bookinstance)) {
      return (
        <div>
          <h1>ID: {bookinstance._id}</h1>
          <p>
            <strong>Title: </strong>
            <Link to={bookinstance.book.url}>{bookinstance.book.title}</Link>
          </p>
          <p><strong>Imprint: </strong> {bookinstance.imprint}</p>
          <p><strong>Status: </strong> {bookinstance.status}</p>

          { bookinstance.status !== 'Available' &&
              <p><strong>Due back: </strong> {bookinstance.due_back_formatted}</p>
          }
        </div>
      )
    }
    else {
      return <p>Bookinstance data not found</p>
    }
  }
}

export default PageBookInstanceDetail
