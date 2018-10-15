import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Fragment } from "react";
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

const AppRoutes = () => (
  <Router>
    <Fragment>
      <Header />
      <Route exact path="/" component={Homepage} />
      <Route path="/categories" component={AllCategories} />
      <Route path="/category/:name" component={ArticleCategory} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/error" component={ErrorPage} />
      {/* protected routes can be rendered using the ProtectedRoutes component */}
      <ProtectedRoute path="/articles/:slug" component={ArticlePage} />
      <ProtectedRoute path="/profile/user" component={ProfilePage} />
      <ProtectedRoute path="/article" component={ArticlePage} />
      <ProtectedRoute path="/profile/user" component={ProfilePage} />
      <ProtectedRoute path="/article" component={ArticlePage} />
      <ProtectedRoute path="/profile/user" component={ProfilePage} />
      <ProtectedRoute
        exact
        path="/create-article"
        component={CreateArticlePage}
      />
      <Footer />
    </Fragment>
  </Router>
);

export default AppRoutes;
