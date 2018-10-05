import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Fragment } from 'react'

import Homepage from './containers/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const AppRoutes = () => (
  <Router>
    <Fragment>
      <Header />
      <Route exact path='/' component={ Homepage } />
      <Footer />
    </Fragment>
  </Router>
);

export default AppRoutes;
