import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import PageHome from './PageHome'
import PageBooks from './PageBooks'
import PageBookInstances from './PageBookInstances'
import PageAuthors from './PageAuthors'
import PageGenres from './PageGenres'
import PageGenreDetail from './PageGenreDetail'

const PageRoutes = () => (
  <Fragment>
    <Route path='/' exact component={ PageHome } />
    <Route path='/catalog/books' component={ PageBooks } />
    <Route path='/catalog/bookinstances' component={ PageBookInstances } />
    <Route path='/catalog/authors' component={ PageAuthors } />
    <Route path='/catalog/genres' component={ PageGenres } />

    <Route path='/catalog/genre/:id' component={ PageGenreDetail } />
  </Fragment>
)

export default PageRoutes
