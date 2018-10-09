import React from 'react';
// icons
import { FiChevronLeft, FiChevronRight} from 'react-icons/fi'
// styles
import styles from './articlesPagination.module.scss'

const ArticlesPagination = () => (
  <div className={ styles.pagination }>
    <ul className={styles.clear}>
      <li className={ styles.dir }><span><FiChevronLeft /></span></li>
      <li><span>1</span></li>
      <li className={styles.active}><span>2</span></li>
      <li><span>3</span></li>
      <li className={styles.dir}><span><FiChevronRight /></span></li>
    </ul>
  </div>
)

export default ArticlesPagination;
