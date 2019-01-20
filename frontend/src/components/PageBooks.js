import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getPageBooks } from '../services'

class PageBooks extends Component {
  state = {
    title: '',
    book_list: []
  }
  componentDidMount() {
    getPageBooks()
      .then(data => {
        this.setState(data)
      })
  }
  render() {
    const { title, book_list } = this.state
    const total_books = book_list.length

    return (
      <div>
        <h1>{title}</h1>
        <ul>
          { total_books > 0 && book_list.map(book => (
              <li>
                <Link to={book.url}>
                  {book.title}
                </Link>
                &nbsp; | {book.author.name}
              </li>
            ))
          }

          { total_books <= 0 && <li>There are no books.</li> }

        </ul>
      </div>
    )
  }
}

export default PageBooks
