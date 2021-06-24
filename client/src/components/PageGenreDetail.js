import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'
import WindowTitle from './WindowTitle'

class PageGenreDetail extends Component {
  state = {
    genre: {},
    genre_books: [],
  }
  componentDidMount() {
    const { id } = this.props.match.params

    getData(URL.genre + id).then((data) => this.setState(data))
  }
  render() {
    const { genre, genre_books } = this.state
    return (
      <div>
        <WindowTitle title="Genre Details" />
        <h1>Genre: {genre.name}</h1>
        <h4>Books</h4>
        <dl>
          {!isEmpty(genre_books) &&
            genre_books.map((book, idx) => (
              <div key={idx}>
                <dt>
                  <Link to={book.url}>{book.title}</Link>
                </dt>
                <dd>{book.summary}</dd>
              </div>
            ))}

          {isEmpty(genre_books) && <p>There are no books</p>}
        </dl>
      </div>
    )
  }
}

export default PageGenreDetail
