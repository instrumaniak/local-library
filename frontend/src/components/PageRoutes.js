import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import PageHome from './PageHome'
import PageBooks from './PageBooks'
import PageBookInstances from './PageBookInstances'
import PageAuthors from './PageAuthors'

const PageRoutes = () => (
  <Fragment>
    <Route path='/' exact component={ PageHome } />
    <Route path='/catalog/books' component={ PageBooks } />
    <Route path='/catalog/bookinstances' component={ PageBookInstances } />
    <Route path='/catalog/authors' component={ PageAuthors } />
  </Fragment>
)

export default PageRoutes
