import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './comment.module.scss';
import createComment from '../../actions/comments';

class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
    };

    this.submitComment = this.submitComment.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  handleTextAreaChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  submitComment(event) {
    event.preventDefault();
    const { comment } = this.state;
    if (comment.length < 1) return;

    const articleSlug = window.location.pathname.split('/article/')[1];
    const { handleCommentSubmit } = this.props;
    handleCommentSubmit(comment, articleSlug);
    this.setState({
      comment: ''
    });
  }

  render() {
    const { comment } = this.state;
    return (
      <form onSubmit = {this.submitComment} >
        <div className={styles.field}>
          <div className="control">
            <textarea
              className="form-control p-3"
              id="comment"
              placeholder="Join the conversation..."
              rows={3}
              value={comment}
              onChange={this.handleTextAreaChange}
            />
          </div>
          {/* display submit button only as soon as user starts typing */}
          {comment ? <button className={`btn btn-success ${styles.submit}`} type="submit">submit</button> : ''}
        </div>
      </form>
    );
  }
}

CommentBox.propTypes = {
  handleCommentSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleCommentSubmit(comment, slug) {
    dispatch(createComment(comment, slug));
  }
});

export default connect(null, mapDispatchToProps)(CommentBox);
