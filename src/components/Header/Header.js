import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import windowSize from 'react-window-size';
import { connect } from 'react-redux';
// components
import SearchButton from '../SearchButton/SearchButton';
import Category from '../Category/Category';
import Menu from './Menu';
import AuthMenu from './AuthMenu';
// styles
import styles from './header.module.scss'
// image
import logoImage from '../../logo.png'
// actions
import { logOutUser } from '../../actions/auth';

class Header extends Component {
  constructor(props) {
    super(props);
    const { windowWidth } = this.props;
    this.state = { mobileCategory: windowWidth <= 900 ? 'hidden' : 'visible' };
    this.triggerMobileCategory = this.triggerMobileCategory.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  triggerMobileCategory(newState) {
    this.setState({
      mobileCategory: newState,
    })
  }

  handleLogOut() {
    const { dispatch } = this.props;
    dispatch(logOutUser());
  }

  render() {
    const { mobileCategory } = this.state;

    // set menu based on authentication state
    let displayedMenu = <AuthMenu logOut={this.handleLogOut} triggerCategory={this.triggerMobileCategory} mobileCategory={mobileCategory} />; // regular
    const { auth } = this.props;
    if (auth && auth.isAuthenticated) {
      displayedMenu = <Menu logOut={this.handleLogOut} user={auth.user} triggerCategory={this.triggerMobileCategory} mobileCategory={mobileCategory} />;
    }

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
          <SearchButton />
          {displayedMenu}
        </div>
      </header>
    );
  }
}

export default connect(state => state)(windowSize(Header));
