import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'

class PageGenres extends Component {
  state = {
    title: '',
    genre_list: []
  }
  componentDidMount() {
    getData(URL.genres)
      .then(data => this.setState(data))
  }
  render() {
    const { title, genre_list } = this.state
    return (
      <div>
        <h1>{ title }</h1>
        <ul>
          { !isEmpty(genre_list) && genre_list.map((genre, idx) => (
              <li key={idx}>
                <Link to={ genre.url }>{ genre.name }</Link>
              </li>
          ))}

          { isEmpty(genre_list) && <li>There are no genres</li> }
        </ul>
      </div>
    )
  }
}

export default PageGenres
