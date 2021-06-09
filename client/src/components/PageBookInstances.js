import React, { Component } from 'react'
// import { Badge } from 'reactstrap'
import isEmpty from 'lodash.isempty'
import { Link } from 'react-router-dom'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'

class PageBookInstances extends Component {
  state = {
    title: '',
    bookinstance_list: [],
  }
  componentDidMount() {
    getData(URL.bookinstances).then((data) => this.setState(data))
  }
  render() {
    const { title, bookinstance_list } = this.state

    const badgeColorClass = (status) => {
      switch (status) {
        case 'Available':
          return 'bg-success'
        case 'Maintenance':
          return 'bg-danger'
        default:
          return 'bg-warning'
      }
    }

    return (
      <div>
        <h1>{title}</h1>
        <ul>
          {!isEmpty(bookinstance_list) &&
            bookinstance_list.map((item, id) => (
              <li key={id}>
                <Link to={item.url}>{item.book.title}</Link>
                <span className={`ms-2 badge ${badgeColorClass(item.status)}`}>
                  {item.status}
                </span>
                <div>{item.imprint}</div>
                <div>{`${
                  item.status !== 'Available'
                    ? 'Due: ' + item.due_back_formatted
                    : ''
                }`}</div>
              </li>
            ))}
          {isEmpty(bookinstance_list) && (
            <li>There are not book copies in this library.</li>
          )}
        </ul>
      </div>
    )
  }
}

export default PageBookInstances
