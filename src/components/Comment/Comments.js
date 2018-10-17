import React, { Fragment } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import Comment from './Comment';
import styles from './comment.module.scss';

const Comments = ({ comments, currentArticleTitle }) => (
  <Fragment>
    <p className={`text-secondary text-left py-3 ${styles.title}`}>
      {comments.length && currentArticleTitle ? `Thoughts on "${currentArticleTitle}"` : ''}
    </p>
    <section>
      {comments && comments.map((comment, idx) => <Comment key={comment.id} id={idx} comment={comment} />)}
    </section>
  </Fragment>
);

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  currentArticleTitle: PropTypes.string.isRequired,
}

export default Comments;
