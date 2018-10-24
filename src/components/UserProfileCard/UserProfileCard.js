import React from 'react';
import PropTypes from 'prop-types';
import styles from './userProfile.module.scss';

const UserProfileCard = ({ user }) => (
  <React.Fragment>
    <div className={styles.card}>
      <div className={styles.profileCard}>
        <div className={styles.profileImageContainer}>
          <a href={`/users/${user.username}`}>
            <img className={styles.profileImg} src={`http://i.pravatar.cc/150?u=${user.username}`} alt="user profile" />
          </a>
        </div>
        <div>
          <div>
            <a href={`/users/${user.username}`}>
              <h3 className={styles.username}>{user.firstName} {user.lastName}</h3>
            </a>
          </div>
          <div>
            <button type="button">
              follow
            </button>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

UserProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserProfileCard;
