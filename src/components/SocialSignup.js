import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../containers/SignIn/SignIn.module.css';

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
            <Link to="/auth/google">
                <i className="fa fa-google fa-lg" />
                Continue with Google
                       </Link>
            <div id={styles.regDivider}>
                <div /> <div>OR</div ><div />
            </div>
        </div>
    )
}
