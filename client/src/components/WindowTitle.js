import React from 'react'
import { Helmet } from 'react-helmet'

const WindowTitle = ({ title }) => (
  <Helmet>
    <title>{title} | LocalLibrary</title>
  </Helmet>
)

export default WindowTitle
