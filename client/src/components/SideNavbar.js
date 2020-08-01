import React from 'react'
import { NavLink } from 'react-router-dom'

const SideNavBar = () => (
  <ul className="ll-sidenavbar">
    <li className='ll-sidenavbar__title'><NavLink exact to="/">Local Library</NavLink></li>

    <li><div className='ll-sidenavbar__seperator'></div></li>
    <li className='ll-sidenavbar__subtitle'><strong>Browse</strong></li>
    <li className='ll-sidenavbar__link'><NavLink to="/catalog/books">Books</NavLink></li>
    <li className='ll-sidenavbar__link'><NavLink to="/catalog/authors">Authors</NavLink></li>
    <li className='ll-sidenavbar__link'><NavLink to="/catalog/genres">Genres</NavLink></li>
    <li className='ll-sidenavbar__link'><NavLink to="/catalog/bookinstances">Book-instances</NavLink></li>

    <li><div className='ll-sidenavbar__seperator'></div></li>
    <li className='ll-sidenavbar__subtitle'><strong>Create new</strong></li>
    <li className='ll-sidenavbar__link'><NavLink to="/catalog/create/author">Author</NavLink></li>
    <li className='ll-sidenavbar__link'><NavLink to="/catalog/create/genre">Genre</NavLink></li>
    <li className='ll-sidenavbar__link'><NavLink to="/catalog/create/book">Book</NavLink></li>
    <li className='ll-sidenavbar__link'><NavLink to="/catalog/create/bookinstance">Book instance</NavLink></li>
  </ul>
)

export default SideNavBar
