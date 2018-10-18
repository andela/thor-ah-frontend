import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => (
    <div className={styles.container}>
        <div className={styles.card}>
            <p className={styles.pFirst}>404 Error</p>
            <p className={styles.pSsec}>OOPS! ... just searched our universe and {"can't"} find the page.</p>
            <p className={styles.pLast}>something went wrong or the page {"does't"} exist anymore</p>
            <Link className={styles.link} to='/' > Lets take you Home </Link>
        </div>
    </div>
)

export default NotFound;
