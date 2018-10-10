import React from 'react';
import styles from './comment.module.scss';

const CommentBox = () => (
  <form>
    <div className={styles.field}>
      <div className="control">
        <textarea
          className="form-control p-3"
          id="comment"
          placeholder="Join the conversation..."
          rows={3}
        />
      </div>
      <button className={`btn btn-success ${styles.submit}`} type="submit">submit</button>
    </div>
  </form>
);

export default CommentBox;
