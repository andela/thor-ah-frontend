import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// icons
import { GoKebabVertical, GoX } from 'react-icons/go';
// styles
import styles from './header.module.scss';
import signupStyle from '../../containers/Signup/Signup.module.css'
import SignUp from '../../containers/Signup/Signup'

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

  signUpModal() {
    return (<div id={signupStyle.container} style={{ 'overflowY': 'auto' }}>
      <button className={signupStyle.modalClose} type="button" onClick={this.toggleModal}>
        <span className={signupStyle.xIcon}>
          <GoX />
        </span>
      </button>
      <SignUp toggleModal={this.toggleModal} />
    </div>)
  }

  render() {
    const { showModal } = this.state;
    let modal = null;
    if (showModal) {
      modal = this.signUpModal();
    }

    const { mobileCategory } = this.props;
    return (
      <div className={styles.links}>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><button type='button' className={signupStyle.transparentBtn} onClick={this.toggleModal}>Register</button></li>
        </ul>
        <button className={styles.mobileMenuCtrl} onClick={this.triggerMobileCategory} type="button">
          {mobileCategory === 'visible' ? <GoX /> : <GoKebabVertical />}
        </button>
        {modal}
      </div>
    );
  }
}

export default AuthMenu;
