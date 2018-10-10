import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Fragment } from 'react'
// components
import ProfilePage from './containers/ProfilePage';
import ArticlePage from './containers/ArticlePage';
import Homepage from './containers/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './containers/ProtectedRoute';
import UploadImage from './components/UplaodImage/UploadImage';

const Login = () => (
  <div><h1>Login page</h1></div>
);

const AppRoutes = () => (
  <Router>
    <Fragment>
      <Header />
      <Route exact path='/' component={Homepage} />
      <Route path='/login' component={ Login }/>
      {/* protected routes can be rendered using the ProtectedRoutes component */}
      <ProtectedRoute path='/article' component={ ArticlePage }/>
      <ProtectedRoute path='/profile/user' component={ ProfilePage }/>
      <Route path='/profile/user' component={ ProfilePage }/>
      <Route exact path='/article' component={ ArticlePage }/>
      <Route exact path='/image' component={ UploadImage }/>
      <Footer />
    </Fragment>
  </Router>
);

export default AppRoutes;
