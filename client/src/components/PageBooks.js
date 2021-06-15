import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'

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
      <div className="ll-page-books-container">
        <h1>Books</h1>
        <hr className="mb-4 " />

        {isEmpty(book_list) && <div>There are no books.</div>}

        <div className="row">
          {!isEmpty(book_list) &&
            book_list.map((book, id) => (
              <div className="col-md-6 col-lg-3 mb-3" key={id}>
                <div class="card card-book-container">
                  <div className="book-image-container">
                    <img src="https://via.placeholder.com/125x200" alt="..." />
                  </div>
                  <div class="card-body">
                    <h6 class="card-title">{book.title}</h6>
                    <p class="card-text">{book.author.name}</p>
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
    )
  }
}

export default PageBooks
