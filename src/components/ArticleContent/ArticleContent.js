import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import format from "date-fns/format";
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from 'react-share';

// icons
import { GoComment } from 'react-icons/go';
// components
import ArticleReaction from "../ArticleReaction/ArticleReaction";
import ArticleComment from "../ArticleComment/ArticleComment";
import ArticleTag from "../ArticleTag/ArticleTag";
import ArticleLoader from "../ArticleLoader";
import CommentBox from "../Comment/CommentBox";

import ReportArticle from "../ReportArticle/ReportArticle";
// actions
import { getArticle } from "../../actions/article";

// styles
import styles from "./ArticleContent.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// images
import profileImage from "../../assets/profile.png";
import pointIcon from "../../assets/circle.png";
import bannerImage from "../../assets/image.png";

// API
const WEB = process.env.REACT_APP_WEB_URL;

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight: false,
      promptStyle: { top: "0px", left: "0px" },
      commentBoxStyle: { top: "0px" },
      showModal: false
    };
    this.elementId = "";
    this.hilightedText = "";
    this.injectedArticleBody = "";
  }

  componentDidMount() {
    const { fetchArticle, slug } = this.props;
    fetchArticle(slug);
  }

  componentDidUpdate(prevProps) {
    const { slug, fetchArticle } = this.props
    if (slug !== prevProps.slug) {
      fetchArticle(slug);
    }
  }

  // returns id to be used to associate comment position to article
  generateId = () => {
    const Id = `artId${Math.floor(Math.random() * 1000000 + 1)}`;
    if (!document.getElementById(Id)) return Id;
    return this.generateId();
  };

  // surrounds selected with element, and returns the selected text
  surroundSelection = () => {
    const { highlight } = this.state;

    if (highlight) this.clearHighlight();

    if (window.getSelection().toString()) {
      // if text selected
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      this.elementId = this.generateId(); // set elementId to object for reuse
      this.hilightedText = selection.toString(); // set highlightedText fro reuse

      const element = document.createElement("span");
      element.id = this.elementId;
      try {
        range.surroundContents(element);
      } catch {
        return false;
      }
      selection.removeAllRanges();
      selection.addRange(range);

      this.injectedArticleBody = document.getElementById(
        `${styles.articleBody}`
      ).innerHTML;
      // set highlight state
      this.setState({ highlight: true });

      return element.id;
    }
    return false;
  };

  clearHighlight = () => {
    const element = document.getElementById(`${this.elementId}`);

    if (element) {
      const parent = element.parentNode;
      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }
      parent.removeChild(element);

      // set highlight state
      this.setState({ highlight: false });
    }
  };

  // Prompt Component
  CommentPrompt = () => {
    const { promptStyle } = this.state;
    return (
      <button type="button" className={styles.commentPrompt} style={promptStyle} onClick={this.displayCommentBox} tabIndex={0}>
        <span><GoComment /></span>
      </button>
    )
  }

  displayComentPromt = () => {
    const { offsetLeft, offsetTop, offsetWidth } = document.getElementById(
      `${this.elementId}`
    );
    const { promptStyle } = this.state;

    this.setState({
      promptStyle: {
        ...promptStyle,
        top: offsetTop - 37, // position just above selected on y-axis
        left: offsetLeft + (offsetWidth / 2) - 25, // position at the center of selection on x-axis
        display: 'block'
      }
    });
  };

  hideCommentPrompt = () => {
    const { promptStyle } = this.state;
    this.setState({
      promptStyle: {
        ...promptStyle,
        display: "none"
      }
    });
  };

  // Highlighted comment Component
  HighlightCommentBox = () => {
    const cssId = this.elementId;
    const highlighted = this.hilightedText;
    const articleBody = this.injectedArticleBody;

    const { commentBoxStyle } = this.state;
    return (
      <div
        className={styles.showCommentBox}
        style={commentBoxStyle}
        onClick={this.styleHighlighted}
        tabIndex={0}
        role="button"
      >
        <CommentBox
          hideHighlightBox={() => {
            this.hideCommentBox();
            this.hideCommentPrompt();
          }}
          highlightedObject={{ articleBody, highlighted, cssId }}
        />
      </div>
    );
  };

  // displays comment box
  displayCommentBox = () => {
    const { offsetTop, offsetHeight } = document.getElementById(
      `${this.elementId}`
    );
    const { commentBoxStyle } = this.state;
    this.setState({
      commentBoxStyle: {
        ...commentBoxStyle,
        top: offsetTop + offsetHeight + 10,
        display: "block"
      }
    });
  };

  // hide comment box
  hideCommentBox = () => {
    const { commentBoxStyle } = this.state;
    this.setState({
      commentBoxStyle: {
        ...commentBoxStyle,
        display: "none"
      }
    });
  };

  styleHighlighted = () => {
    document.getElementById(`${this.elementId}`).style.background = "#ee3";
  };

  highlightAndComment = () => {
    const selectedId = this.surroundSelection();

    if (selectedId) {
      this.displayComentPromt();
    } else {
      this.hideCommentPrompt();
      this.hideCommentBox();
    }
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const user = JSON.parse(localStorage.user);
    const decoded = jwtDecode(user.token);
    const { id } = decoded;

    const { article, loading } = this.props;
    const { highlight, showModal } = this.state;
    const { CommentPrompt, HighlightCommentBox } = this
    const { authorId, slug, title } = article;

    const shareUrl = `${WEB}/articles/${slug}`;
    const myImg = 'https://res.cloudinary.com/dgbmeqmyf/image/upload/v1540323349/logo.png';
    const mimg = React.createElement('img', { src: myImg });

    return (
      <Fragment>
        <div className="card col-md-1 text-center sm-share-div">
          <div>
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              picture={mimg}>
              <FacebookIcon size={35} round className={styles.shareCursor} />
            </FacebookShareButton>
          </div>
          <div>
            <TwitterShareButton
              url={shareUrl}
              title={`${title} \n`}
              via="AuthorsHaven">
              <TwitterIcon size={35} round className={styles.shareCursor} />
            </TwitterShareButton>
          </div>
          <div>
            <EmailShareButton url={shareUrl}
              subject={title}
              body={`New Article share from Authors' Haven \n\n ${title}: ${shareUrl}`}
            >
              <EmailIcon size={35} round className={styles.shareCursor} />
            </EmailShareButton>
          </div>
        </div>
        <div className="card col-md-8 p-0">
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
                        <a href={`/users/${article.author.username}`}>
                          <img
                            src={profileImage}
                            className="rounded-circle"
                            alt="profile"
                          />
                        </a>
                      </div>
                      <div
                        className={`${
                          styles.article_text
                          } d-flex px-2 flex-column `}
                      >
                        <span className="text-center">
                          <a href={`/users/${article.author.username}`}>
                            {article.author.username}
                          </a>
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


                    <div className={`${styles.content} text-left mt-2`}>
                      <div onMouseUp={this.highlightAndComment} className={styles.articleBody} id={styles.articleBody} tabIndex={0} role="button">
                        {ReactHtmlParser(article.body)}
                      </div>
                      <br /> <br /> <br />
                      {
                        article && authorId === id ?
                          <Link to={`/me/articles/${slug}/edit`} className={styles.updateLink}>
                            Edit article
                        </Link> : null
                      }
                      <CommentPrompt />
                      {highlight && <HighlightCommentBox />}
                    </div>
                    <ArticleTag tags={article.tags} />
                    <ArticleReaction articleId={article.id} showModal={this.handleShowModal}/>
                    <hr className={styles.divider} />
                    <ArticleComment />
                    {showModal ? (
                      <ReportArticle
                        articleslug={slug}
                        closeModal={this.handleCloseModal}
                      />
                    ) : null}
                  </Fragment>
                )}
            </div>
          </div>
        </div>
      </Fragment>
    )
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
