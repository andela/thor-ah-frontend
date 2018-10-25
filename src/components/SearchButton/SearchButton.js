import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import styles from "./SearchButton.module.scss";

const SearchButton = () => (
  <div className={`${styles.search}`}>
    <Link to="/search">
      <FaSearch />
    </Link>
  </div>
);

export default SearchButton;

