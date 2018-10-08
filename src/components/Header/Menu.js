import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import styles from './header.module.scss';

const  photoStyle = {
  height: '40px',
  width: '40px',
  border: '1px solid #000',
  borderRadius: '50%'
}
const Menu = (props) => {
  const { user } = props;
  const { username } = user;
  return (
    <div className={ styles.menu }>
      <ul>
        <li><Link to="/articles/new">Publish</Link></li>
        <li className="notification">
          <Link to="/notifications">{ <FaBell />}</Link>
        </li>
        <li>
          <Link to="/#">
            <img src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_1280.png" style={ photoStyle } alt={ username } className="avatar" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
