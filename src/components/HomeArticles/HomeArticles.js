import React, { Component } from 'react';
// components
import ArticlesTab from '../ArticlesTab/ArticlesTab';
import Articles from '../Articles/Articles';
import ArticlesPagination from '../ArticlesPagination/ArticlesPagination';
// styles
import style from './homeArticles.module.scss';

class HomeArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'featured',
      tabContent: 'featured',
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    this.setState({
      activeTab: tab,
      tabContent: tab,
    })
  }

  render() {
    const { activeTab, tabContent } = this.state;
    return (
      <div className={style.homeArticles}>
        <ArticlesTab toggle={ this.toggleTab } active={ activeTab } />
        <Articles content={ tabContent } />
        <ArticlesPagination />
      </div>
    )
  }
}

export default HomeArticles;
