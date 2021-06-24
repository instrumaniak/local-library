import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'
import WindowTitle from './WindowTitle'

class PageAuthors extends Component {
  state = {
    title: '',
    author_list: [],
  }
  componentDidMount() {
    getData(URL.authors).then((data) => this.setState(data))
  }
  render() {
    const { author_list } = this.state
    return (
      <div>
        <WindowTitle title="Authors" />
        <h1>Authors</h1>
        <table className="table mt-4 mb-4">
          <thead>
            <tr>
              <th scope="col">Author</th>
              <th scope="col">Total Books</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(author_list) &&
              author_list.map((author, idx) => (
                <tr key={idx}>
                  <th scope="row">
                    <Link
                      className="text-decoration-none"
                      to={`/catalog/author/${author._id}`}
                    >
                      {author.name}
                    </Link>
                  </th>
                  <td>{author.book_count}</td>
                </tr>
              ))}
            {isEmpty(author_list) && <tr>There are no authors</tr>}
          </tbody>
        </table>
      </div>
    )
  }
}

export default PageAuthors
