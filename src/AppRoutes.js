import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Fragment } from 'react'
// components
import ProfilePage from './containers/ProfilePage';
import ArticlePage from './containers/ArticlePage';
import Homepage from './containers/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const AppRoutes = () => (
  <Router>
    <Fragment>
      <Header />
      <Route exact path='/' component={Homepage} />
      <Route path='/profile/user' component={ ProfilePage }/>
      <Route exact path='/article' component={ ArticlePage }/>
      <Footer />
    </Fragment>
  </Router>
);

export default AppRoutes;
