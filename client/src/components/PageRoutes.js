import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import PageHome from './PageHome'
import PageBooks from './PageBooks'
import PageBookInstances from './PageBookInstances'
import PageAuthors from './PageAuthors'
import PageGenres from './PageGenres'

import PageGenreDetail from './PageGenreDetail'
import PageBookDetail from './PageBookDetail'
import PageAuthorDetail from './PageAuthorDetail'
import PageBookInstanceDetail from './PageBookInstanceDetail'

import PageGenreCreate from './PageGenreCreate'
import PageAuthorCreate from './PageAuthorCreate'
import PageBookCreate from './PageBookCreate'
import PageBookInstanceCreate from './PageBookInstanceCreate'
import PageSignUp from './PageSignUp'
import PageLogIn from './PageLogIn'

const PageRoutes = () => (
  <Fragment>
    <Route path="/" exact component={PageHome} />
    <Route path="/catalog/books" component={PageBooks} />
    <Route path="/catalog/bookinstances" component={PageBookInstances} />
    <Route path="/catalog/authors" component={PageAuthors} />
    <Route path="/catalog/genres" component={PageGenres} />

    <Route path="/catalog/create/genre" component={PageGenreCreate} />
    <Route path="/catalog/create/author" component={PageAuthorCreate} />
    <Route path="/catalog/create/book" component={PageBookCreate} />
    <Route
      path="/catalog/create/bookinstance"
      component={PageBookInstanceCreate}
    />

    <Route path="/catalog/book/:id" component={PageBookDetail} />
    <Route
      path="/catalog/bookinstance/:id"
      component={PageBookInstanceDetail}
    />
    <Route path="/catalog/author/:id" component={PageAuthorDetail} />
    <Route path="/catalog/genre/:id" component={PageGenreDetail} />

    <Route path="/user/signup" component={PageSignUp} />
    <Route path="/user/login" component={PageLogIn} />
  </Fragment>
)

export default PageRoutes
