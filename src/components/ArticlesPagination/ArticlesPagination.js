import React from 'react';
import ReactPaginate from 'react-paginate';

// icons
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
// styles
import styles from '../Articles/articles.module.scss';

const ArticlesPagination = ({ passedCount, articleCount, articleSize, onPageChange }) => {
 return (
  <div className={ styles.content_pagination }>
    <ReactPaginate
      previousLabel={
        <FaAngleLeft />
      }
      nextLabel= {
        <FaAngleRight />
      }
      breakLabel={<span>...</span>}
      breakClassName={ styles.break_label }
      pageCount={articleCount / articleSize}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      initialPage={passedCount}
      onPageChange={onPageChange}
      containerClassName={ styles.pagination }
      activeClassName={ styles.active }
    />
  </div>
  );
}
     


export default ArticlesPagination;
