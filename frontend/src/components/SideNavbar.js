import React from 'react'
import { Link } from 'react-router-dom'

const SideNavBar = () => (
  <ul className="sidebar-nav">
    <li> <Link to="/">Home</Link></li>
    <li> <Link to="/catalog/books">All books</Link></li>
    <li> <Link to="/catalog/authors">All authors</Link></li>
    <li> <Link to="/catalog/genres">All genres</Link></li>
    <li> <Link to="/catalog/bookinstances">All book-instances</Link></li>
    <li>
      <hr />
    </li>
    <li> <Link to="/catalog/author/create">Create new author</Link></li>
    <li> <Link to="/catalog/genre/create">Create new genre</Link></li>
    <li> <Link to="/catalog/book/create">Create new book</Link></li>
    <li> <Link to="/catalog/bookinstance/create">Create new book instance (copy)</Link></li>
  </ul>
)

export default SideNavBar
