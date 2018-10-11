import React from 'react';
import PropTypes from 'prop-types';
import styles from './comment.module.scss';
// images
import likeIcon from "../../assets/up.png";
import dislikeIcon from "../../assets/down.png";
// import profileImage from "../../assets/Ellipse.png";

const Comment = ({ comment }) => (
  <div className={`card p-3 ${styles.comment}`}>
    <div className="d-flex ">
      <img className={styles.commenterImg} src={`http://i.pravatar.cc/150?u=${comment.commenter.firstName}`} alt="profile" />
      <span className="font-weight-bold text-secondary p-2">
        {comment.commenter.firstName}
      </span>
    </div>
    <p className="text-secondary text-left my-4">
      {comment.body}
    </p>
    <div className="d-flex">
      <div className="px-2">
        <img src={likeIcon} alt="icon" />
        <span>{comment.likesCount}</span>
      </div>
      <div className="px-2">
        <img src={dislikeIcon} alt="icon" />
        <span>{comment.dislikesCount}</span>
      </div>
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment;
