import React, { Component } from 'react'
import isEmpty from 'lodash.isempty'
import { Link } from 'react-router-dom'
import { getData } from '../services'
import { URL } from '../services/api-endpoints'
import WindowTitle from './WindowTitle'

class PageBookInstances extends Component {
  state = {
    bookinstance_list: [],
  }
  componentDidMount() {
    getData(URL.bookinstances).then((data) => this.setState(data))
  }
  render() {
    const { bookinstance_list } = this.state

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
        <WindowTitle title="Book Instances" />
        <h1>Book Instances</h1>
        <table className="table mt-4 mb-4">
          <thead>
            <tr>
              <th scope="col">Book Title</th>
              <th scope="col">Imprint</th>
              <th scope="col">Status</th>
              <th scope="col">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(bookinstance_list) &&
              bookinstance_list.map((item, id) => (
                <tr key={id}>
                  <th scope="row">
                    <Link className="text-decoration-none" to={item.url}>
                      {item.book.title}
                    </Link>
                  </th>
                  <td>{item.imprint}</td>
                  <td>
                    <span
                      className={`ms-2 badge ${badgeColorClass(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status !== 'Available'
                      ? item.due_back_formatted
                      : '-'}
                  </td>
                </tr>
              ))}
            {isEmpty(bookinstance_list) && (
              <tr>There are not book copies in this library.</tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default PageBookInstances
