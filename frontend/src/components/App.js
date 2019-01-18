import React, { Component } from 'react'
//import { Button } from 'reactstrap'

class App extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <ul className="sidebar-nav">
                <li> <a href="/catalog">Home</a></li>
                <li> <a href="/catalog/books">All books</a></li>
                <li> <a href="/catalog/authors">All authors</a></li>
                <li> <a href="/catalog/genres">All genres</a></li>
                <li> <a href="/catalog/bookinstances">All book-instances</a></li>
                <li>
                  <hr />
                </li>
                <li> <a href="/catalog/author/create">Create new author</a></li>
                <li> <a href="/catalog/genre/create">Create new genre</a></li>
                <li> <a href="/catalog/book/create">Create new book</a></li>
                <li> <a href="/catalog/bookinstance/create">Create new book instance (copy)</a></li>
              </ul>
            </div>
            <div className="col-sm-10">
              <h1>Content</h1>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App
