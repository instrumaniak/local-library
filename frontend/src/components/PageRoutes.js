import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import PageHome from './PageHome'
import PageBooks from './PageBooks'

const PageRoutes = () => (
  <Fragment>
    <Route path='/' exact component={ PageHome } />
    <Route path='/catalog/books' component={ PageBooks } />
  </Fragment>
)

export default PageRoutes
