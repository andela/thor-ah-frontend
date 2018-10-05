import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import windowSize from 'react-window-size';
// components
import Search from '../Search/Search';
import Category from '../Category/Category';
import Menu from './Menu';
import AuthMenu from './AuthMenu';
// styles
import styles from './header.module.scss'
// image
import logoImage from '../../logo.png'

class Header extends Component {
  constructor(props) {
    super(props);
    const { windowWidth } = this.props;
    this.state = { mobileCategory: windowWidth <= 900 ? 'hidden' : 'visible' };
    this.triggerMobileCategory = this.triggerMobileCategory.bind(this);
  }

  triggerMobileCategory(newState) {
    this.setState({
      mobileCategory: newState,
    })
  }

  render() {
    const { authenticated, user } = this.props;
    const { mobileCategory } = this.state;
    return (
      <header className={styles.clear}>
        <div className={styles.header_logo}>
          <Link to="/">
            <img src={logoImage} className={styles.logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.header_category}>
          <Category mobileCategory={mobileCategory} />
        </div>
        <div className={styles.header_half}>
          <Search />
          {authenticated ? <Menu user={user} /> : <AuthMenu triggerCategory={this.triggerMobileCategory} mobileCategory={mobileCategory} />}
        </div>
      </header>
    );
  }
}

export default windowSize(Header);
