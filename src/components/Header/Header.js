import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import Search from "../Search/Search";
import Category from "../Category/Category";
import logo from "../../logo.png";
import AuthMenu from "./AuthMenu";
import Menu from "./Menu";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.getMenu();
  }

  getMenu() {
    if (1 < 2) {
      this.setState({ menu: <Menu /> });
    } else {
      this.setState({ menu: <AuthMenu /> });
    }
  }

  render() {
    const { menu } = this.state;
    return (
      <header className={styles.clear}>
        <div className={styles.header_logo}>
          <Link to="/">
            <img src={logo} className={styles.logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.header_category}>
          <Category />
        </div>
        <div className={styles.header_half}>
          <Search />
          {menu}
        </div>
      </header>
    );
  }
}

export default Header;
