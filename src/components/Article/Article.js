import React from 'react';
import { Link } from 'react-router-dom';
// styles
import styles from './article.module.scss';

const Article = (props) => {
  const { thumbnail, title, slug, snippet, details } = props;
  const { author, timeToRead, date } = details;
  return (
    <div className={ styles.article }>
      <div className={ styles.thumbnail }>
        <img src={ thumbnail } alt={ title } />
      </div>
      <div className={ styles.content }>
        <h4><Link to={ `/articles/${slug}` }>{ title }</Link></h4>
        <p>{ snippet }</p>
      </div>
      <div className={ styles.details }>
        <p className={ styles.author }>{ author }</p>
        <ul>
          <li>{ date }</li>
          <li>{ timeToRead }</li>
        </ul>
      </div>
    </div>
  );
}

export default Article;
