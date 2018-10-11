import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import Comment from './Comment';

const Comments = ({ comments, currentArticleTitle }) => (
  <React.Fragment>
    <p className="text-secondary text-left py-3">
      {currentArticleTitle ? `Thoughts on "${currentArticleTitle}"` : ''}
    </p>
    <section>
      {comments && comments.map(comment => <Comment key={comment.id} comment={comment} />)}
    </section>
  </React.Fragment>
);

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  currentArticleTitle: PropTypes.string.isRequired,
}

export default Comments;
