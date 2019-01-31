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
    <li> <NavLink to="/catalog/create/author">Author</NavLink></li>
    <li> <NavLink to="/catalog/create/genre">Genre</NavLink></li>
    <li> <NavLink to="/catalog/create/book">Book</NavLink></li>
    <li> <NavLink to="/catalog/create/bookinstance">Book instance (copy)</NavLink></li>
  </ul>
)

export default SideNavBar
