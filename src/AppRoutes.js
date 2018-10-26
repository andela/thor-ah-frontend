import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import React, { Fragment } from "react";
// components
import ProfilePage from "./containers/ProfilePage";
import ArticlePage from "./containers/ArticlePage";
import Homepage from "./containers/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./containers/ProtectedRoute";
import AllCategories from "./containers/Categories/Categories";
import ArticleCategory from "./containers/Categories/SingleCategory";
import CreateArticle from "./containers/CreateArticle/CreateArticlePage";
import NotFound from "./containers/NotFound/NotFound";
import GetDrafts from "./containers/Drafts/Drafts";
import UpdateArticle from "./containers/UpdateArticle/UpdateArticle";
import SocialAuth from "./containers/SocialAuth";
import Settings from './components/Settings/Settings';

const AppRoutes = () => (
  <Router>
    <Fragment>
      <Header />

      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/logout" render={() => <Redirect to="/" />} />
        <Route
          exact
          path="/api/auth/:provider/callback"
          component={SocialAuth}
        />
        <Route path="/categories" component={AllCategories} />
        <Route path="/category/:name" component={ArticleCategory} />
        {/* protected routes can be rendered using the ProtectedRoutes component */}
        <ProtectedRoute path="/articles/:slug" component={ArticlePage} />
        <ProtectedRoute path="/profile/user" component={ProfilePage} />
        <ProtectedRoute
          exact
          path="/article/create"
          component={CreateArticle}
        />
        <ProtectedRoute path="/settings" component={Settings} />
        <ProtectedRoute path="/me/drafts" component={GetDrafts} />
        <ProtectedRoute
          path="/me/articles/:slug/edit"
          component={UpdateArticle}
        />
        {/* will always render when no other path is matched */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default AppRoutes;
