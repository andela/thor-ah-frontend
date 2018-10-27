import React from 'react';
import PropTypes from 'prop-types';
import styles from './userProfile.module.scss';

const UserProfileCard = ({ user, showButton, idx, handleUnfollow }) => (
  <React.Fragment>
    <div className={styles.card}>
      <div className={styles.profileCard}>
        <div className={styles.profileImageContainer}>
          <a href={`/users/${user.username}`}>
            <img className={styles.profileImg} src={user.image || `http://i.pravatar.cc/150?u=${user.username}`} alt="user profile" />
          </a>
        </div>
        <div>
          <div>
            <a href={`/users/${user.username}`}>
              <h3 className={styles.username}>{user.firstName} {user.lastName}</h3>
            </a>
          </div>
          <div>
            {
              showButton
              ? (
                  <button data-index={idx} data-user={user.username} onClick={handleUnfollow} type="button">
                    unfollow
                  </button>
                )
              : null
            }
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

UserProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
  showButton: PropTypes.bool,
  idx: PropTypes.number.isRequired,
}

UserProfileCard.defaultProps = {
  showButton: false,
}

export default UserProfileCard;
