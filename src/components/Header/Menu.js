import React from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import styles from "./header.module.scss";

const AuthMenu = () => {
  return (
    <div className={styles.links}>
      <ul>
        <li>
          <Link to="/articles/new">Publish</Link>
        </li>
        <li>
          <Link to="/register">
            <FaBell />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthMenu;
