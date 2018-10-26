import React, { Component } from 'react';
import { connect } from 'react-redux'
// icons
import { FaTwitterSquare, FaLinkedin } from 'react-icons/fa';
// components
import UserFollow from '../UserFollow/UserFollow';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
// styles
import styles from './UserBio.module.scss';
import isEmpty from '../../utils/isEmpty';

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
    const { user, viewOtherUser, viewUser, handleFollow, isFollowing } = this.props;
    const userData = viewOtherUser ? viewUser : user;
    const { firstName, lastName, username, linkedin, twitter, bio, image } = userData;

    // prevent UI from rendering 'undefined' for some values
    // while fetching data;
    if(isEmpty(userData)) return null;

    return (
      <div className={styles.profileHeader}>
        <a href="/profile/user">
          <img src={image || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=C40018&color=fff&size=300`} alt={username} className={styles.profileImage} />
        </a>
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
          {viewOtherUser ? '' : <UserFollow />}
          {
            viewOtherUser
            ? (
                <div className={styles.btnAction}>
                  <button className={isFollowing ? styles.following: ''} type='submit' onClick={handleFollow}>{isFollowing ? 'Unfollow': 'Follow'}</button>
                </div>
              )
            : (
                <div className={styles.btnAction}>
                  <button type='submit' onClick={this.toggleUpdateProfile}>Edit profile</button>
                </div>
              )
          }
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
    viewUser: state.userProfile.user,
  }
}

export default connect(mapStateToProps)(UserBio);
