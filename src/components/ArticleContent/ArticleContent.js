import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import format from "date-fns/format";
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
// components
import ArticleReaction from "../ArticleReaction/ArticleReaction";
import ArticleComment from "../ArticleComment/ArticleComment";
import ArticleTag from "../ArticleTag/ArticleTag";
import ArticleLoader from "../ArticleLoader";
// actions
import { getArticle } from "../../actions/article";
// styles
import styles from "./ArticleContent.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// images
import profileImage from "../../assets/profile.png";
import pointIcon from "../../assets/circle.png";
import bannerImage from "../../assets/image.png";

// icons
import { FaComment } from 'react-icons/fa';

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight: false,
      promptStyle: { top: '0px', left: '0px', position: 'absolute' }
    };
  }

  componentDidMount() {
    const articleSlug = window.location.pathname.split("/articles/")[1];
    const { fetchArticle } = this.props;
    fetchArticle(articleSlug);
  }

  // returns id to be used to associate comment position to article
  generateId = () => 'spanId'

  // surrounds selected with element, and returns the selected text
  surroundSelection = () => {
    if (window.getSelection().toString()) { // if text selected
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      const span = document.createElement('span')
      span.id = this.generateId()
      span.appendChild(range.extractContents());
      range.insertNode(span);

      return span.id;
    }
    return false
  }

  clearHighlight = () => {
    var span = document.getElementById('spanId');
    var parent = span.parentNode;

    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }

    parent.removeChild(span);

  }

  CommentPrompt = () => {
    // const position = { top: '20px', left: '10px', position: 'absolute' }
    const { promptStyle } = this.state
    return (
      <div className={styles.commentPrompt} style={promptStyle} onBlur={this.clearHighlight} >
        <p className={styles.commentPromptIcon}><FaComment /> </p>
      </ div>
    )
  }

  displayComentPromt = () => {
    console.log(window.getSelection().getRangeAt(0).getBoundingClientRect())

    const { offsetLeft, offsetTop, offsetWidth } = document.getElementById('spanId')
    const { promptStyle } = this.state

    this.setState({
      promptStyle: {
        ...promptStyle,
        top: offsetTop - 30, // position just above selected on y-axis
        left: offsetLeft + (offsetWidth / 2) - 25, // position at the center of selection on x-axis
        display: 'block'
      }
    })
  }

  hideCommentPrompt = () => {
    const { promptStyle } = this.state
    this.setState({
      promptStyle: {
        ...promptStyle,
        display: 'none'
      }
    })
  }

  highlightAndComment = () => {
    const selectedId = this.surroundSelection();

    if (selectedId) {
      this.displayComentPromt()
    } else {
      this.hideCommentPrompt()
      this.clearHighlight()
    }
  }

  render() {

    const user = JSON.parse(localStorage.user);
    const decoded = jwtDecode(user.token);
    const { id } = decoded;

    const { article, loading } = this.props;

    const { highlight, promptStyle } = this.state;
    const { CommentPrompt } = this
    const { authorId, slug } = article;
    return (
      <div className="card col-md-7 p-0">
        <div>
          <img
            className="card-img-top"
            src={bannerImage}
            alt="banner"
            width="100%"
          />
          <div className="content p-5 ">
            {loading ? (
              <ArticleLoader />
            ) : (
                <Fragment>
                  <h3 className="h1 text-left">{article.title}</h3>
                  <div className="d-flex justify-content-start">
                    <div>
                      <img
                        src={profileImage}
                        className="rounded-circle"
                        alt="profile"
                      />
                    </div>
                    <div
                      className={`${
                        styles.article_text
                        } d-flex px-2 flex-column `}
                    >
                      <span className="text-center">
                        {article.author.username}
                      </span>
                      <span className="font-italic">
                        {format(new Date(article.createdAt), ["MMM DD"])}
                      </span>
                    </div>
                    <div className="my-3 text-secondary">
                      <img src={pointIcon} alt="icon" height="7px" />
                      <span className="pl-1">
                        {`${article.timeToRead} min read`}
                      </span>
                    </div>
                  </div>
                  <div className="text-left mt-2">
                    <p className={styles.content}>{article.body}</p>
                  </div>
                  {
                    article && authorId === id ?
                      <Link to={`/me/articles/${slug}/edit`} className={styles.updateLink}>
                        Edit article
                  </Link> : null
                  }
                  <div className={`${styles.content} text-left mt-2`}>
                    <div onMouseUp={this.highlightAndComment}>
                      {article.body}
                      <CommentPrompt />
                    </div>
                  </div>
                  <ArticleTag tags={article.tags} />
                  <ArticleReaction articleId={article.id} />
                  <hr className={styles.divider} />
                  <ArticleComment />
                </Fragment>
              )}
          </div>
        </div>
      </div>
    );
  }
}

ArticleContent.propTypes = {
  fetchArticle: PropTypes.func.isRequired
};

/**
 * mapStateToProps
 * @param state
* @returns {Object}
  */
const mapStateToProps = state => ({
  article: state.oneArticleReducer.article,
  loading: state.oneArticleReducer.loading
});

/**
 * mapDispatchToProps
 * @param mapDispatchToProps
* @returns {Object}
  */
const mapDispatchToProps = dispatch => ({
  fetchArticle(articleSlug) {
    dispatch(getArticle(articleSlug));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleContent);
