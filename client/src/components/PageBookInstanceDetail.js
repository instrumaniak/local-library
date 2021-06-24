import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'
import WindowTitle from './WindowTitle'

class PageBookInstanceDetail extends Component {
  state = {
    bookinstance: {},
  }
  componentDidMount() {
    const { id } = this.props.match.params

    getData(URL.bookinstance + id).then((data) => this.setState(data))
  }
  render() {
    const { bookinstance } = this.state

    return (
      <div>
        <WindowTitle title="Book Instance Details" />
        {!isEmpty(bookinstance) && (
          <div>
            <h1>ID: {bookinstance._id}</h1>
            <p>
              <strong>Title: </strong>
              <Link to={bookinstance.book.url}>{bookinstance.book.title}</Link>
            </p>
            <p>
              <strong>Imprint: </strong> {bookinstance.imprint}
            </p>
            <p>
              <strong>Status: </strong> {bookinstance.status}
            </p>

            {bookinstance.status !== 'Available' && (
              <p>
                <strong>Due back: </strong> {bookinstance.due_back_formatted}
              </p>
            )}
          </div>
        )}
        {isEmpty(bookinstance) && <p>Bookinstance data not found</p>}
      </div>
    )
  }
}

export default PageBookInstanceDetail
