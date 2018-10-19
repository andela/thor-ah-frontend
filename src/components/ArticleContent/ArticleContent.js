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
import CommentBox from "../Comment/CommentBox";

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight: false,
      promptStyle: { top: '0px', left: '0px' },
      commentBoxStyle: { top: '0px' }
    };
    this.elementId = ''
    this.hilightedText = ''
    this.injectedArticleBody = ''
  }

  componentDidMount() {
    const articleSlug = window.location.pathname.split("/articles/")[1];
    const { fetchArticle } = this.props;
    fetchArticle(articleSlug);
  }

  // returns id to be used to associate comment position to article
  generateId = () => {
    const Id = 'artId' + Math.floor((Math.random() * 1000000) + 1).toString()
    if (!document.getElementById(Id)) return Id;
    return generateId()
  }

  // surrounds selected with element, and returns the selected text
  surroundSelection = () => {
    const { highlight } = this.state

    if (highlight) this.clearHighlight()

    if (window.getSelection().toString()) { // if text selected
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      this.elementId = this.generateId(); // set elementId to object for reuse
      this.hilightedText = selection.toString(); // set highlightedText fro reuse

      const element = document.createElement('span')
      element.id = this.elementId
      element.appendChild(range.extractContents());
      range.insertNode(element);

      this.injectedArticleBody = document.getElementById('articleBody').innerHTML;
      // set highlight stat
      this.setState({ highlight: true })

      return element.id;
    }
    return false
  }

  clearHighlight = () => {
    var element = document.getElementById(`${this.elementId}`);

    if (element) {
      var parent = element.parentNode;
      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }
      parent.removeChild(element);

      // set highlight stat
      this.setState({ highlight: false })
    }
  }


  // Prompt Component
  CommentPrompt = () => {
    const { promptStyle } = this.state
    return (
      <div className={styles.commentPrompt} style={promptStyle} onClick={this.displayCommentBox} >
        <p className={styles.commentPromptIcon}><FaComment /> </p>
      </ div>
    )
  }

  displayComentPromt = () => {
    const { offsetLeft, offsetTop, offsetWidth } = document.getElementById(`${this.elementId}`)
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

  // Hilighted comment Component
  HighlightCommentBox = () => {
    const cssId = this.elementId
    const highlighted = this.hilightedText
    const articleBody = this.injectedArticleBody

    const { commentBoxStyle } = this.state
    return (
      <div className={styles.showCommentBox} style={commentBoxStyle} onClick={this.styleHighlighted}>
        <CommentBox hideHighlightBox={() => { this.hideCommentBox(); this.hideCommentPrompt() }} highlightedObject={{ articleBody, highlighted, cssId }} />
      </div>
    )
  }
  // displays comment box
  displayCommentBox = () => {
    const { offsetLeft, offsetTop, offsetHeight } = document.getElementById(`${this.elementId}`)
    const { commentBoxStyle } = this.state
    this.setState({
      commentBoxStyle: {
        ...commentBoxStyle,
        top: offsetTop + offsetHeight + 10,
        display: 'block'
      }
    })
  }

  // hide comment box
  hideCommentBox = () => {
    const { commentBoxStyle } = this.state
    this.setState({
      commentBoxStyle: {
        ...commentBoxStyle,
        display: 'none'
      }
    })
  }


  styleHighlighted = () => {
    document.getElementById(`${this.elementId}`).style.background = '#ee3';
  }

  highlightAndComment = () => {
    const selectedId = this.surroundSelection();

    if (selectedId) {
      this.displayComentPromt()
    } else {
      this.hideCommentPrompt()
      this.hideCommentBox()
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
