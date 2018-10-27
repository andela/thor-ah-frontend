import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// styles
import styles from './heroFeatured.module.scss';

const HeroArticles = (props) => {
  const { title, slug, details } = props;
  const { author } = details;
  return (

    <Fragment>
      <div className={styles.sub_featured__single}>
        <h2><Link to={`/articles/${slug}`}>{title}</Link></h2>
        <p>{author}</p>
      </div>
    </Fragment>


  )
}

export default HeroArticles;
