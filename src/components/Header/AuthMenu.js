import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// icons
import { GoKebabVertical, GoX } from 'react-icons/go';
// styles
import styles from './header.module.scss';
import Signin from '../../containers/SignIn/SignIn'

class AuthMenu extends Component {
  constructor(props) {
    super(props);
    this.triggerMobileCategory = this.triggerMobileCategory.bind(this);

    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal })
  }

  triggerMobileCategory() {
    const { triggerCategory, mobileCategory } = this.props;
    triggerCategory(mobileCategory === 'visible' ? 'hidden' : 'visible');
  }

  render() {
    const { showModal } = this.state;
    let modal = null;
    if (showModal) {
      modal = <Signin toggleModal={this.toggleModal} />;
    }

    const { mobileCategory } = this.props;
    return (
      <div className={styles.links}>
        <ul>
          <li> 
            <button className={styles.transparentBtn} type="button" onClick={this.toggleModal}> Login</button>
          </li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        <button className={styles.mobileMenuCtrl} onClick={ this.triggerMobileCategory } type="button">
          { mobileCategory === 'visible' ? <GoX /> : <GoKebabVertical /> }
        </button>
        {modal}
      </div>
    );
  }
}

export default AuthMenu;
