import React, { Component } from 'react'
import SideNavbar from './SideNavbar'
import PageRoutes from './PageRoutes'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 sidenavbar-container">
            <SideNavbar />
          </div>
          <div className="col-sm-10 page-container">
            <PageRoutes />
          </div>
        </div>
      </div>
    )
  }
}

export default App
