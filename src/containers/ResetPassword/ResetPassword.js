import React, { Component } from 'react';
import styles from './resetPassword.module.scss';

class ResetPassword extends Component {
  constructor(prop) {
    super(prop);
    this.state = {};
  }

  render() {
    return (
      <div className={ styles.reset_password }>
        <div className={ styles.reset_password_content }>
          <div className={ styles.title}>
            Forgot Password
          </div>
        </div>
      </div>
    )
  }
}

export default ResetPassword;
