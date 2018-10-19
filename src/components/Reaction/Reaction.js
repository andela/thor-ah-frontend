import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// actions
import { articleReaction, articleReactionCount } from "../../actions/article";
// images
import likeIcon from "../../assets/up.png";
import dislikeIcon from "../../assets/down.png";
import commentIcon from "../../assets/comment.png";

class Reaction extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { article, fetchReactions } = this.props;
    if (article.id !== prevProps.article.id) {
      fetchReactions(article.id);
    }
  }

  handleClick = e => {
    const { action } = e.target.dataset;
    const { handleReaction, article } = this.props;
    handleReaction(article.id, action);
  };

  render() {
    const { article, comments, reactions } = this.props;

    return (
      <div className="d-flex">
        <div className="px-1">
          <img
            src={likeIcon}
            onClick={this.handleClick}
            data-key={article.id}
            data-action="like"
            alt="icon"
          />

          <span className="pl-1">{reactions.likes || 0}</span>
        </div>
        <div className="px-1">
          <img
            src={dislikeIcon}
            onClick={this.handleClick}
            data-key={article.id}
            data-action="dislike"
            alt="icon"
          />
          <span className="pl-1">{reactions.dislikes || 0}</span>
        </div>
        <div className="px-1">
          <img src={commentIcon} alt="icon" />
          <span className="pl-1">{comments.length || 0}</span>
        </div>
      </div>
    );
  }
}

Reaction.propTypes = {
  article: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.oneArticleReducer.article,
  comments: state.comments.articleComments.data,
  reactions: state.oneArticleReducer.reactions
});

const mapDispatchToProps = dispatch => ({
  handleReaction(articleId, reactionType) {
    dispatch(articleReaction(articleId, reactionType));
  },
  fetchReactions(articleId) {
    dispatch(articleReactionCount(articleId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reaction);
