import React, { Component } from 'react';
import styles from './updateProfile.module.scss';

class UserPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      rNewPassword: '',
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
  }

  render() {
    const { currentPassword, newPassword, rNewPassword } = this.state;
    return (
      <div>
        <form onSubmit={ this.onSubmit }>
          <div className={styles.form_input_group}>
            <label htmlFor="CurrentPassword">Current Password</label>
            <input type="password" onChange={this.onChange} name="currentPassword" value={currentPassword || ''} placeholder="Current password" />
          </div>
          <div className={styles.form_input_group}>
            <label htmlFor="NewPassword">New Password</label>
            <input type="password" onChange={this.onChange} name="newPassword" value={newPassword || ''} placeholder="New password" />
          </div>
          <div className={styles.form_input_group}>
            <label htmlFor="RepeatNewPassword">Repeat New Password</label>
            <input type="password" onChange={this.onChange} name="rNewPassword" value={rNewPassword || ''} placeholder="Repeat new password" />
          </div>
          <div className={styles.form_input_group}>
            <button type="submit">Update Password</button>
          </div>
        </form>
      </div>
    )
  }
}

export default UserPassword;
