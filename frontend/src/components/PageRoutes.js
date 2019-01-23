import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import PageHome from './PageHome'
import PageBooks from './PageBooks'
import PageBookInstances from './PageBookInstances'

const PageRoutes = () => (
  <Fragment>
    <Route path='/' exact component={ PageHome } />
    <Route path='/catalog/books' component={ PageBooks } />
    <Route path='/catalog/bookinstances' component={ PageBookInstances } />
  </Fragment>
)

export default PageRoutes
