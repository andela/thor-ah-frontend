import React, { Component } from 'react'
import HomeArticles from '../../components/HomeArticles/HomeArticles';
import styles from './home.module.scss';
import HeroFeatured from '../../components/HeroFeatured/HeroFeatured';

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
