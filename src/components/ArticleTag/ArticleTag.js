import React from 'react';
import styles from './ArticleTag.module.scss';

const ArticleTag = () => (
  <div className="text-left">
    <button type="button" className={styles.btn_round}>
      Real Estate
    </button>
    <button type="button" className={styles.btn_round}>
      Housing
    </button>
  </div>
);

export default ArticleTag;
