import React, { Component } from 'react';
import { connect } from 'react-redux'
// icons
import { FaTwitterSquare, FaLinkedin } from 'react-icons/fa';
// components
import UserFollow from '../UserFollow/UserFollow';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
// styles
import styles from './UserBio.module.scss';
// images
import avatar from '../../assets/avatar.png';

class UserBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateProfileActive: false,
    };
  }

  toggleUpdateProfile = (e) => {
    e.preventDefault();
    const { updateProfileActive } = this.state;
    this.setState({ updateProfileActive: !updateProfileActive });
  }

  render() {
    const { updateProfileActive } = this.state;
    const { user } = this.props;
    const { firstName, lastName, username, linkedin, twitter, bio, image } = user;

    return (
      <div className={styles.profileHeader}>
        <img src={image || avatar} alt={username} className={styles.profileImage} />
        <span className={styles.userNames}>{`${firstName} ${lastName}`}</span>
        <div className={styles.bioDiv}>
          <div className={styles.userBio}>
            {bio}
          </div>
          {!linkedin && !twitter ? '' : <div className={styles.socialMedia}>
            <ul>
              {!twitter ? '' : <li>
                <a href={`${twitter}`} target="_blank" rel="noopener noreferrer"><FaTwitterSquare /></a>
              </li>}
              {!linkedin ? '' : <li>
                <a href={`${linkedin}`} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              </li>}
            </ul>
          </div>}
          <UserFollow />
          <div className={styles.btnAction}>
            <button type='submit' onClick={this.toggleUpdateProfile}>Edit profile</button>
          </div>
        </div>
        <UpdateProfile active={updateProfileActive} toggle={this.toggleUpdateProfile} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { user } = auth;
  return {
    user,
  }
}

export default connect(mapStateToProps)(UserBio);
