import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'
import WindowTitle from './WindowTitle'

class PageGenres extends Component {
  state = {
    title: '',
    genre_list: [],
  }
  componentDidMount() {
    getData(URL.genres).then((data) => this.setState(data))
  }
  render() {
    const { genre_list } = this.state
    return (
      <div>
        <WindowTitle title="Genres" />
        <h1>Genres</h1>
        <table className="table mt-4 mb-4">
          <thead>
            <tr>
              <th scope="col">Genre</th>
              <th scope="col">Total Books</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(genre_list) &&
              genre_list.map((genre, idx) => (
                <tr key={idx}>
                  <th scope="row">
                    <Link
                      className="text-decoration-none"
                      to={`/catalog/genre/${genre._id}`}
                    >
                      {genre.name}
                    </Link>
                  </th>
                  <td>{genre.book_count}</td>
                </tr>
              ))}
            {isEmpty(genre_list) && <tr>There are no genres</tr>}
          </tbody>
        </table>
      </div>
    )
  }
}

export default PageGenres
