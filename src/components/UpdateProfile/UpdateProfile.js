import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import UserPassword from './UserPassword';
import styles from './updateProfile.module.scss';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'userInfo',
    };
  }

  processAction = (event) => {
    event.preventDefault();
    const active = event.target.getAttribute('data-tab');
    this.setState({ activeTab: active });
  }

  render() {
    const { activeTab } = this.state;
    const { active, toggle } = this.props;
    const style = {
      display: !active ? 'none' : 'block',
    }
    return (
      <div className={styles.update_profile} style={style}>
        <div className={styles.update_profile_content}>
          <div className={styles.tab_container}>
            <ul className={styles.tabs_controls}>
              <li data-tab="userInfo"
                onClick={this.processAction}
                className={activeTab === 'userInfo' ? styles.active : ''}>
                User Info
              </li>
              <li data-tab="password"
                onClick={this.processAction}
                className={activeTab === 'password' ? styles.active : ''}>
                Password
              </li>
              <li className={styles.tab_close} onClick={toggle}>
                <FaTimes />
              </li>
            </ul>

            <div className={`${styles.tab_contents} ${activeTab === 'userInfo' ? styles.active : ''}`}>
              <UserInfo />
            </div>
            <div className={`${styles.tab_contents} ${activeTab === 'password' ? styles.active : ''}`}>
              <UserPassword />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UpdateProfile.propTypes = {
  active: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default UpdateProfile;
