import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss'
import Search from '../Search/Search';
import Category from '../Category/Category';
import logo from '../../logo.png';

const Header = () => (
  <header className={ styles.clear }>
    <div className={ styles.header_logo }>
      <Link to="/">
        <img src={logo} className={styles.logo} alt="logo" />
      </Link>
    </div>
    <div className={ styles.header_category }>
      <Category />
    </div>
    <div className={ styles.header_half }>
      <Search />
      <div className={ styles.links }>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </div>
    </div>
  </header>
);

export default Header;
