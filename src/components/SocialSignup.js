import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../containers/Signup/Signup.module.css';

const API = process.env.REACT_APP_API;

export default function SocialSignup() {
    return (
      <div className={styles.socialLogin}>
        <Link to="/auth/twitter" >
          <i className="fa fa-twitter fa-lg" />
          Continue with Twitter
        </Link>
        <Link to="/auth/facebook">
          <i className="fa fa-facebook fa-lg" />
          Continue with Facebook
        </Link>
        <a href={`${API}/api/auth/google`}>
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
