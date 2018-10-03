import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Fragment } from 'react'

import LandingPage from './containers/LandingPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const Sample = () => (
  <div className="landing-page">
    <h1>This is just a sample page for routes</h1>
  </div>
)

const AppRoutes = () => (
  <Router>
    <Fragment>
      <NavBar />
      <Route exact path='/' component={ LandingPage }/>
      <Route exact path='/sample' component={ Sample }/>
      <Footer />
    </Fragment>
  </Router>
)

export default AppRoutes;