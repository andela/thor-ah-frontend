import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Fragment } from 'react'
// components
import ProfilePage from './containers/ProfilePage';
import ArticlePage from './containers/ArticlePage';
import Homepage from './containers/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './containers/ProtectedRoute';
import Signin from './containers/SignIn/SignIn';
import AllCategories from './containers/Categories/Categories';
import ArticleCategory from './containers/Categories/SingleCategory';
import NotFound from './containers/NotFound/NotFound';
import CreateArticlePage from './containers/CreateArticle/CreateArticlePage';

const AppRoutes = () => (
  <Router>
    <Fragment>
      <Header />

      <ProtectedRoute path='/profile/user' component={ProfilePage} />
      <Switch>
        <Route exact path='/' component={Homepage} />
        {/* protected routes can be rendered using the ProtectedRoutes component */}
        <Route path='/categories' component={AllCategories} />
        <Route path='/category/:name' component={ArticleCategory} />
        <ProtectedRoute path='/articles/:slug' component={ArticlePage} />
        <ProtectedRoute path='/profile/user' component={ProfilePage} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/create-article' component={ CreateArticlePage }/>

        {/* will always render when no other path is matched */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default AppRoutes;