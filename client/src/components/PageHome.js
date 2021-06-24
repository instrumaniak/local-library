import React, { Component } from 'react'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'
import WindowTitle from './WindowTitle'

class PageHome extends Component {
  state = {
    title: '',
    error: null,
    data: {},
  }
  componentDidMount() {
    getData(URL.home).then((data) => this.setState(data))
  }
  render() {
    const { title, error, data } = this.state

    if (!error && !isEmpty(data)) {
      return (
        <div>
          <WindowTitle title="Home" />
          <h1>{title}</h1>
          <p>The library has the following record counts:</p>
          <ul>
            <li>
              <strong>Books: </strong>
              {data.book_count}
            </li>
            <li>
              <strong>Copies: </strong>
              {data.book_instance_count}
            </li>
            <li>
              <strong>Copies Available: </strong>
              {data.book_instance_available_count}
            </li>
            <li>
              <strong>Authors: </strong>
              {data.author_count}
            </li>
            <li>
              <strong>Genres: </strong>
              {data.genre_count}
            </li>
          </ul>
        </div>
      )
    } else return null
  }
}

export default PageHome
