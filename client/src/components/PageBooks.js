import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'
import WindowTitle from './WindowTitle'

class PageBooks extends Component {
  state = {
    title: '',
    book_list: [],
  }
  componentDidMount() {
    getData(URL.books).then((data) => this.setState(data))
  }
  render() {
    const { book_list } = this.state

    return (
      <>
        <WindowTitle title="Books" />
        <div className="ll-page-books-container">
          <h1>Books</h1>
          <hr className="mb-4 " />

          {isEmpty(book_list) && <div>There are no books.</div>}

          <div className="row">
            {!isEmpty(book_list) &&
              book_list.map((book, id) => (
                <div className="col-md-6 col-lg-3 mb-3" key={id}>
                  <div className="card card-book-container">
                    <div className="book-image-container">
                      <img
                        src="/assets/images/bookcover-placeholder.jpg"
                        alt="book-cover-placeholder"
                      />
                    </div>
                    <div className="card-body">
                      <h6 className="card-title">{book.title}</h6>
                      <p className="card-text">{book.author.name}</p>
                    </div>
                    <div className="p-3">
                      <Link
                        to={book.url}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    )
  }
}

export default PageBooks
