import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoKebabVertical, GoX } from 'react-icons/go';
import styles from './header.module.scss';

class AuthMenu extends Component {
  constructor(props) {
    super(props);
    this.triggerMobileCategory = this.triggerMobileCategory.bind(this);
  }

  triggerMobileCategory() {
    const { triggerCategory, mobileCategory } = this.props;
    triggerCategory(mobileCategory === 'visible' ? 'hidden' : 'visible');
  }

  render() {
    const { mobileCategory } = this.props;
    return (
      <div className={styles.links}>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        <button className={styles.mobileMenuCtrl} onClick={ this.triggerMobileCategory } type="button">
          { mobileCategory === 'visible' ? <GoX /> : <GoKebabVertical /> }
        </button>
      </div>
    );
  }
}

export default AuthMenu;
