import React from 'react';
// components
import UserFollow from '../UserFollow/UserFollow';
// styles
import styles from './UserBio.module.scss';
// images
import profileImage from '../../assets/images/ksolo.jpg';

const UserBio = () => (
  <div className={ styles.profileHeader }>
      <img src={ profileImage } alt="Kingsley Solomon" className={styles.profileImage} />
      <span className={ styles.userNames }>Kingsley Solomon</span>
      <div className={ styles.bioDiv }>
        <div className={ styles.userBio }>
          I am a cool Software Developer, who loves writing about my profession.
          I want to let world know about the awesomeness of Tech
        </div>
        <div className={ styles.socialMedia }>
          <div>
            <a href="https://twitter.com"> <i className="fa fa-twitter faTwitter" /> </a>
          </div>
          <div>
            <a href="https://facebook.com"> <i className="fa fa-facebook faFacebook" /> </a>
          </div>
          <div>
            <a href="https://linkedin.com"> <i className="fa fa-linkedin faLinkediN" /> </a>
          </div>
        </div>
        <UserFollow />
        <div className={styles.btnAction}>
          <button type='submit'>Edit profile</button>
        </div>
      </div>
    </div>
)

export default UserBio;
