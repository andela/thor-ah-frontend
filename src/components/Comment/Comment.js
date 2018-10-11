import React from 'react';
import styles from './comment.module.scss';
// images
import likeIcon from "../../assets/up.png";
import dislikeIcon from "../../assets/down.png";
import profileImage from "../../assets/Ellipse.png";

const Comment = () => (
  <div className={`card p-3 ${styles.comment}`}>
    <div className="d-flex ">
      <img src={profileImage} alt="profile" />
      <span className="font-weight-bold text-secondary p-2">
        John Doe
          </span>
    </div>
    <p className="text-secondary text-left my-4">
      Amazing Write up. Thanks for this Jane
        </p>
    <div className="d-flex">
      <div className="px-2">
        <img src={likeIcon} alt="icon" />
        <span>3</span>
      </div>
      <div className="px-2">
        <img src={dislikeIcon} alt="icon" />
        <span>0</span>
      </div>
    </div>
  </div>
);

export default Comment;
