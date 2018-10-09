import React, { Fragment } from 'react';
// styles
import styles from '../UserProfileTabs/UserProfileTabs.module.scss';

const ReadingStatistics = () => (
  <Fragment>
    <div className={ styles.statsGrid }>
      <div>
        <h1>Articles Read</h1>
      </div>
      <div>
        <a href="/articles-read">
          <h1>20</h1> 
        </a>
      </div>
    </div>
    <div className={ styles.statsGrid }>
      <div>
        <h1>Most Read Category</h1>
      </div>
      <div>
        <a href="/articles-read">
          <h1>Agriculture</h1> 
        </a>
      </div>
    </div>
    <div className={ styles.statsGrid }>
      <div>
        <h1>Articles Liked</h1>
      </div>
      <div>
        <a href="/articles-read">
          <h1>20</h1> 
        </a>
      </div>
    </div>
    <div className={ styles.statsGrid }>
      <div>
        <h1>Articles Disliked</h1>
      </div>
      <div>
        <a href="/articles-read">
          <h1>20</h1> 
        </a>
      </div>
    </div>
  </Fragment>
)

export default ReadingStatistics;
