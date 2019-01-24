import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'

class PageBooks extends Component {
  state = {
    title: '',
    book_list: []
  }
  componentDidMount() {
    getData(URL.books)
      .then(data => this.setState(data))
  }
  render() {
    const { title, book_list } = this.state
    //const total_books = book_list.length

    return (
      <div>
        <h1>{title}</h1>
        <ul>
          { !isEmpty(book_list) && book_list.map((book, id) => (
              <li key={id}>
                <Link to={book.url}>
                  {book.title}
                </Link>
                &nbsp; | {book.author.name}
              </li>
            ))
          }

          { isEmpty(book_list) && <li>There are no books.</li> }

        </ul>
      </div>
    )
  }
}

export default PageBooks
