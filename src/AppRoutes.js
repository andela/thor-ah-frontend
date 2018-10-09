import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Fragment } from 'react'
// components
import ProfilePage from './containers/ProfilePage';
import ArticlePage from './containers/ArticlePage';
import Homepage from './containers/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './containers/ProtectedRoute';

const Login = () => (
  <div><h1>Login page</h1></div>
);
import LandingPage from './containers/LandingPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProfilePage from './containers/ProfilePage';
import SignIn from './containers/SignIn/SignIn';

const Sample = () => (
  <div className="landing-page">
    <h1>This is just a sample page for routes</h1>
  </div>
)
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
      <Route exact path='/article' component={ ArticlePage }/>=
      <NavBar />
      <Route exact path='/' component={ LandingPage }/>
      <Route exact path='/sample' component={ Sample }/>
      <Route path='/profile/user' component={ ProfilePage }/>
      <Route exact path='/signin' component={ SignIn }/>=
      <Route exact path='/signin' component={ SignIn }/>
      <Footer />
    </Fragment>
  </Router>
);

export default AppRoutes;
