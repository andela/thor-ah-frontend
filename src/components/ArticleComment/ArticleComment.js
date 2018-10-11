import React from 'react';
// styles
import styles from './ArticleComment.module.scss';
import "bootstrap/dist/css/bootstrap.min.css";
// components
import CommentBox from '../Comment/CommentBox';
import Comments from '../Comment/Comments';

const ArticleComment = () => (
  <div className={styles.comment}>
    <CommentBox />
    <Comments />
  </div>
);

export default ArticleComment;
