import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import ProfilePage from "./containers/ProfilePage";
import ArticlePage from "./containers/ArticlePage";
import Homepage from "./containers/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./containers/ProtectedRoute";
import Signin from "./containers/SignIn/SignIn";
import AllCategories from "./containers/Categories/Categories";
import ArticleCategory from "./containers/Categories/SingleCategory";
import CreateArticlePage from "./containers/CreateArticle/CreateArticlePage";
import ErrorPage from "./containers/Error";
import NotFound from './containers/NotFound/NotFound';

const AppRoutes = () => (
  <Router>
    <Fragment>
      <Header />
      <Route exact path="/" component={Homepage} />
      <Route path="/categories" component={AllCategories} />
      <Route path="/category/:name" component={ArticleCategory} />
      <Route exact path="/signin" component={Signin} />
      <Switch>
        <Route exact path='/' component={Homepage} />
        {/* protected routes can be rendered using the ProtectedRoutes component */}
        <Route path='/categories' component={AllCategories} />
        <Route path='/category/:name' component={ArticleCategory} />
        <ProtectedRoute path='/profile/user' component={ProfilePage} />
        <Route exact path="/error" component={ErrorPage} />
        {/* protected routes can be rendered using the ProtectedRoutes component */}
        <ProtectedRoute path="/articles/:slug" component={ArticlePage} />
        <ProtectedRoute path="/article" component={ArticlePage} />
        <ProtectedRoute
          exact
          path="/create-article"
          component={CreateArticlePage}
        />

        {/* will always render when no other path is matched */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default AppRoutes;
