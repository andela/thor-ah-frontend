import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";

const Menu = () => {
  return (
    <div className={styles.links}>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
