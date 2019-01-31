import React from 'react'
import { NavLink } from 'react-router-dom'

const SideNavBar = () => (
  <ul className="sidenavbar">
    <li> <NavLink exact to="/">Home</NavLink></li>

    <li><hr /></li>
    <li><strong>Browse</strong></li>
    <li> <NavLink to="/catalog/books">Books</NavLink></li>
    <li> <NavLink to="/catalog/authors">Authors</NavLink></li>
    <li> <NavLink to="/catalog/genres">Genres</NavLink></li>
    <li> <NavLink to="/catalog/bookinstances">Book-instances</NavLink></li>

    <li><hr /></li>
    <li><strong>Create new</strong></li>
    <li> <NavLink to="/catalog/author/create">Author</NavLink></li>
    <li> <NavLink to="/catalog/genre/create">Genre</NavLink></li>
    <li> <NavLink to="/catalog/book/create">Book</NavLink></li>
    <li> <NavLink to="/catalog/bookinstance/create">Book instance (copy)</NavLink></li>
  </ul>
)

export default SideNavBar
