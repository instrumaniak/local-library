import React, { Component } from 'react'
import { Badge } from 'reactstrap'
import isEmpty from 'lodash.isempty'
import { Link } from 'react-router-dom'
import { getPageBookInstances } from '../services'

class PageBookInstances extends Component {
  state = {
    title: '',
    bookinstance_list: []
  }
  componentDidMount() {
    getPageBookInstances()
      .then(data => {
        this.setState(data)
      })
  }
  render() {
    const { title, bookinstance_list } = this.state

    const activeColor = status => {
      switch(status) {
        case 'Available':
          return 'success'
        case 'Maintenance':
          return 'danger'
        default:
          return 'warning'
      }
    }

    return (
      <div>
        <h1>{ title }</h1>
        <ul>
          { !isEmpty(bookinstance_list) &&
             bookinstance_list.map((item, id) => (
              <li key={id}>
                <Link to={item.url}>{item.book.title}</Link>
                <span>{' '}<Badge color={activeColor(item.status)}>{item.status}</Badge></span>
                <div>{item.imprint}</div>
                <div>{
                  `${item.status !== 'Available' ? 'Due: ' + item.due_back_formatted : ''}`
                }</div>
              </li>
          ))}
          { isEmpty(bookinstance_list) &&
              <li>There are not book copies in this library.</li>
          }
        </ul>
      </div>
    )
  }
}

export default PageBookInstances
