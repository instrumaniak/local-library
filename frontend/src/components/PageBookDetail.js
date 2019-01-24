import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'

class PageBookDetail extends Component {
  state = {
    title: '',
    book: {},
    book_instances: []
  }
  componentDidMount() {
    const { id } = this.props.match.params

    getData(URL.book + id)
      .then(data => this.setState(data))
  }
  render() {
    const { title, book, book_instances } = this.state

    if(!isEmpty(book)) {
      return (
        <div>
          <h1>{title}: { book.title }</h1>
          <p>
            <strong>Author:</strong>{' '}
            <Link to={book.author.url}>{book.author.name}</Link>
          </p>
          <p>
            <strong>Summary:</strong>{' '}
            {book.summary}
          </p>
          <p>
            <strong>ISBN:</strong>{' '}
            {book.isbn}
          </p>
          <p>
            <strong>Genre:</strong>{' '}
            {book.genre.map((genre, idx) => (
              <span key={idx}>
                <Link to={genre.url}>{genre.name}</Link>
                {`${idx < book.genre.length - 1 ? ', ': ''}`}
              </span>
            ))}
          </p>
          <br/>

          <h4>Copies</h4>
          <hr/>
          {!isEmpty(book_instances) && book_instances.map((instance, idx) => (
            <div>
              <p><Link to={instance.url}>{instance.imprint}</Link></p>
              <p>Status: {instance.status} </p>
              <hr/>
            </div>
          ))}

          {isEmpty(book_instances) && <p>There are no copies found.</p>}
        </div>
      )
    }
    else return null

  }
}

export default PageBookDetail
