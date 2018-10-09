import React from 'react';
import { Link } from 'react-router-dom';
// styles
import styles from './footer.module.scss';

const Footer = () => (
  <footer className={ styles.clear }>
    <div className={ styles.links }>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      </ul>
    </div>
    <div className={ styles.copyright }>
      <p>&copy; 2018 <Link to="/">Thor-AH</Link>. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
