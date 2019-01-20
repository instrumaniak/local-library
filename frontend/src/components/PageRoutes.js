import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import PageHome from './PageHome'

const PageRoutes = () => (
  <Fragment>
    <Route path='/' exact component={ PageHome } />
  </Fragment>
)

export default PageRoutes
