/* eslint-disable */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import createArticle from "../../actions/article";
import ArticleTitle from "./ArticleTitle";
import TextEditor from "./TextEditor";
import stripHtml from "../../utils/stripHtml";
import styles from "./CreateArticle.module.scss";

class CreateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Title",
      body: "Share your thoughts...",
      description: "",
      error: {
        title: "",
        body: ""
      },
      message: ""
    };
  }

  clearErrorMessages = () => {
    this.setState({
      error: {
        title: "",
        body: ""
      }
    });
  };

  titleChangeHandler = title => {
    this.clearErrorMessages();
    this.setState({
      title
    });
  };

  editorChangeHandler = body => {
    this.clearErrorMessages();
    this.setState({
      body
    });
  };

  titlePlaceholderFocusInHandler = () => {
    const { title } = this.state;
    if (title.trim() === "Title") {
      this.setState({ title: "" });
    }
  };

  titlePlaceholderFocusOutHandler = () => {
    const { title } = this.state;
    if (title.trim() === "") {
      this.setState({
        title: "Title"
      });
    }
  };

  bodyPlaceholderFocusInHandler = () => {
    const { body } = this.state;
    if (
      body.trim() === "Share your thoughts..." ||
      body.trim() === "<p>Share your thoughts...</p>"
    ) {
      this.setState({
        body: ""
      });
    }
  };

  bodyPlaceholderFocusOutHandler = () => {
    const { body } = this.state;
    if (body.trim() === "") {
      this.setState({
        body: "Share your thoughts..."
      });
    }
  };

  imageUploadHandler = (blobInfo, success, failure) => {
    const { CLOUDINARY_API_KEY, UPLOAD_PRESET, UPLOAD_URL } = process.env;
    try {
      const formData = new FormData();
      formData.append("file", blobInfo.blob());
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("api_key", CLOUDINARY_API_KEY);
      return axios
        .post(UPLOAD_URL, formData, {
          headers: {
            "Content-Type": "Application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(response => {
          const data = response.data;
          const fileUrl = data.secure_url;
          success(fileUrl);
        });
    } catch (error) {
      failure("file upload failed");
    }
  };

  validateArticle = () => {
    const { title, body } = this.state;
    const bodyValue = this.rootNode.props.value;

    if (title === "Title" || title.trim() === "") {
      this.setState({
        error: {
          title: "Publishing will be available when you provide a title"
        }
      });
      return false;
    }

    if (
      body === "Share your thoughts..." ||
      bodyValue.length < 30 ||
      body.trim() === ""
    ) {
      this.setState({
        error: {
          body: "Publishing will be available when you start typing"
        }
      });
      return false;
    }

    this.setState({
      error: {}
    });

    return true;
  };

  handleSubmit = () => {
    const { title, body, error } = this.state;
    const { createArticle } = this.props;
    const description = stripHtml(body).slice(0, 200);
    const articleData = {
      title,
      body,
      description
    };

    if (this.validateArticle() === false) {
      console.log(error);
      return;
    }

    this.setState({
      title: "Title",
      body: "Share your thoughts..."
    });

    const response = createArticle(articleData);

    if (response) {
      switch (response.status) {
        case 201:
          <Redirect to={{
            pathname: '/'
          }} />
        default:
        <Redirect to={{
          pathname: '/error'
        }} />;
      }
    }
  };

  render() {
    const { title, body, error, message } = this.state;
    const errorArray = Object.keys(error).filter(err => err[1] === "");
    return (
      <Fragment>
        {Object.keys(error).length === 0 ? null : (
          <div>
            {Object.entries(error).map((err, index) => (
              <div className={styles.error} key={index}>
                {err[1]}
              </div>
            ))}
          </div>
        )}
        <div className="col-md-8 col-sm-10 col-12 mx-auto my-5">
          <div className={styles.createArticle}>
            <div className={styles.articleTitle}>
              <ArticleTitle
                value={title}
                titleChangeHandler={this.titleChangeHandler}
                titlePlaceholderFocusInHandler={
                  this.titlePlaceholderFocusInHandler
                }
                titlePlaceholderFocusOutHandler={
                  this.titlePlaceholderFocusOutHandler
                }
              />
            </div>
            <div className={styles.textEditor}>
              <TextEditor
                ref={node => (this.rootNode = node)}
                value={body}
                editorChangeHandler={this.editorChangeHandler}
                bodyPlaceholderFocusInHandler={
                  this.bodyPlaceholderFocusInHandler
                }
                bodyPlaceholderFocusOutHandler={
                  this.bodyPlaceholderFocusOutHandler
                }
                imageUploadHandler={this.imageUploadHandler}
              />
            </div>
          </div>
          <div className={styles.buttonDiv}>
            <button
              className={styles.publishButton}
              onClick={this.handleSubmit}
            >
              Publish
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

CreateArticle.propTypes = {
  createArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article,
  error: state.error
});

export default connect(
  mapStateToProps,
  { createArticle }
)(CreateArticle);
