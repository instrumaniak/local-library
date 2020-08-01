import React, { Component } from 'react'
import isEmpty from 'lodash.isempty'
import { Link } from 'react-router-dom'
import { URL } from '../services/api-endpoints'
import { getData } from '../services'

class PageAuthorDetails extends Component {
  state = {
    author: {},
    author_books: []
  }
  componentDidMount() {
    // get id from react-router
    const { id } = this.props.match.params

    getData(URL.author + id)
      .then(data => this.setState(data))
  }
  render() {
    const { author, author_books } = this.state
    return (
      <div>
        <h1>Author: {author.name}</h1>
        <p>{author.lifespan}</p>

        <div>
          <h4>Books</h4>
          <dl>
            { !isEmpty(author_books) && author_books.map((book, idx) => (
                <p key={idx}>
                  <dt>
                    <Link to={book.url}>{book.title}</Link>
                  </dt>
                  <dd>{book.summary}</dd>
                </p>
            ))}

            { isEmpty(author_books) &&
                <p>No book found for this author.</p>
            }
          </dl>
        </div>
      </div>
    )
  }
}

export default PageAuthorDetails
