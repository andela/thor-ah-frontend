import React from 'react';
import { Link } from 'react-router-dom';
import styles from './heroFeatured.module.scss';

const MainFeature = (props) => {
  const { title, slug, details, profileUrl } = props;
  return (

    <div>
      <Link to={`/articles/${slug}`}>{title}</Link>
      <p>BY <a className={styles.authorlink} href={profileUrl}>{details}</a></p>
    </div>

  )
}

export default MainFeature;
