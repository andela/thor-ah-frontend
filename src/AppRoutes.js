import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Fragment } from "react";

import Homepage from "./containers/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import Article from "./components/Article/Article";
// import ArticlePage from './components/ArticlePage';

const AppRoutes = () => (
  <Router>
    <Fragment>
      <Header />
      <Route exact path="/" component={Homepage} />
      {/* <Route exact path='/articles' component={ ArticlePage } /> */}
      <Footer />
    </Fragment>
  </Router>
);

export default AppRoutes;
