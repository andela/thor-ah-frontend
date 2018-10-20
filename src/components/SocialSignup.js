import React from 'react'
import styles from '../containers/Signup/Signup.module.css';

const API = process.env.REACT_APP_API;

export default function SocialSignup() {
    return (
      <div className={styles.socialLogin}>
        <a className={styles.facebook} href={`${API}/api/auth/facebook`}>
          <i className="fa fa-facebook fa-lg" />
          Continue with Facebook
        </a>
        <a className={styles.google} href={`${API}/api/auth/google`}>
          <i className="fa fa-google fa-lg" />
          Continue with Google
        </a>
        <div id={styles.regDivider}>
          <div />
            <div>OR</div>
          <div />
        </div>
      </div>
    )
}
