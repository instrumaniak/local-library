import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash.isempty'
import { getPageAuthors } from '../services'

class PageAuthors extends Component {
  state = {
    title: '',
    author_list: []
  }
  componentDidMount() {
    getPageAuthors()
      .then(data => this.setState(data))
  }
  render() {
    const { title, author_list } = this.state
    return (
      <div>
        <h1>{ title }</h1>
        <ul>
          { !isEmpty(author_list) && author_list.map((author, idx) => (
              <li key={idx}>
                <Link to={ author.url }>{ author.name }</Link>{' '}
                { author.lifespan && <span>( { author.lifespan } )</span> }
              </li>
          ))}

          { isEmpty(author_list) && <li>There are no authors</li> }
        </ul>
      </div>
    )
  }
}

export default PageAuthors
