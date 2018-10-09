import React, { Component } from 'react'
// styles
import styles from './home.module.scss';
// components
import HeroFeatured from '../../components/HeroFeatured/HeroFeatured';
import HomeArticles from '../../components/HomeArticles/HomeArticles';

class Home extends Component  {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={ styles.home }>
        <HeroFeatured />
        <HomeArticles />
      </div>
    );
  }
}

export default Home;
