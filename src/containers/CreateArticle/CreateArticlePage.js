/* eslint-disable */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

import createArticle from "../../actions/createArticle";
import ArticleTitle from "./ArticleTitle";
import TextEditor from "./TextEditor";
import stripHtml from "../../utils/stripHtml";
import styles from "./CreateArticle.module.scss";

// Save article as draft
import { draftArticle, getDrafts } from '../../actions/drafts';

class CreateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Title",
      body: "Share your thoughts...",
      description: "",
      loading: false,
      message: "",
      error: {
        title: "",
        body: "",
        message: ""
      }
    };

    // this.draftArticle = this.draftArticle.bind(this);
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

  titlePlaceHolderFocusHandler = event => {
    const eventType = event.type;
    const { title } = this.state;
    switch (eventType) {
      case "focusin":
        if (title.trim() === "Title") {
          this.setState({ title: "" });
        }
      case "focusout":
        if (title.trim() === "") {
          this.setState({
            title: "Title"
          });
        }
      default:
        return null;
    }
  };

  bodyPlaceholderFocusHandler = event => {
    const eventType = event.type;
    const { body } = this.state;
    switch (eventType) {
      case "focusin":
        if (
          body.trim() === "Share your thoughts..." ||
          body.trim() === "<p>Share your thoughts...</p>"
        ) {
          this.setState({
            body: ""
          });
        }
      case "focusout":
        if (body.trim() === "") {
          this.setState({
            body: "Share your thoughts..."
          });
        }
      default:
        return null;
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

  handleSubmit = async () => {
    const { title, body, error } = this.state;
    const { createArticle } = this.props;
    const description = stripHtml(body).slice(0, 200);
    const articleData = {
      title,
      body,
      description,
    };

    if (this.validateArticle() === false) {
      return;
    }

    this.setState({
      loading: true
    });

    const response = await createArticle(articleData);

    if (response) {
      switch (response.payload.status) {
        case "success":
          this.setState({
            title: "Title",
            body: "Share your thoughts...",
            loading: false,
            message: "Article was successfully created"
          });
          setTimeout(() => {
            this.setState({
              message: ""
            });
          }, 2000);
        default:
          this.setState({
            loading: false
          });
          return null;
      }
    } else {
      this.setState({
        error: {
          message:
            "An error occurred while creating the artilcle. Please refresh your browser and try again"
        }
      });
      setTimeout(() => {
        this.setState({
          error: { message: "" }
        });
      }, 2000);
    }
  };

  draftSuccess() {
    this.setState({
      title: "Title",
      body: "Share your thoughts...",
      loading: false,
      message: "You have successfully created a draft. You can always update and publish when ready"
    });
  }

  draftArticle = async () => {
    const { title, body, error } = this.state;
    const { draftArticle } = this.props;
    const description = stripHtml(body).slice(0, 200);
    const draft = {
      title,
      body,
      description,
      published: false
    };

    if (this.validateArticle() === false) {
      return;
    }

    this.setState({
      loading: true
    });

    await draftArticle(draft);
  }

  handleDraft = () => {
    this.draftArticle().then(() => {
      this.draftSuccess();
    })
  }

  componentWillUnmount() {
    return this.draftArticle()
  }


  render() {
    const { title, body, error, loading, message } = this.state;
    return (
      <Fragment>
        {message === "" ? "" : <div className={styles.message}>{message}</div>}
        {Object.entries(error).every(err => err[1] === "") ? null : (
          <div>
            {Object.entries(error).map((err, index) => (
              <div className={styles.error} key={index}>
                {err[1]}
              </div>
            ))}
          </div>
        )}
        <div className="text-center">
          {loading ? <i className="fa fa-3x fa-spinner fa-spin" /> : null}
        </div>
        <div className="col-md-8 col-sm-10 col-12 mx-auto my-5">
          <div className={styles.createArticle}>
            <div className={styles.articleTitle}>
              <ArticleTitle
                value={title}
                titleChangeHandler={this.titleChangeHandler}
                titlePlaceholderFocusInHandler={
                  this.titlePlaceHolderFocusHandler
                }
                titlePlaceholderFocusOutHandler={
                  this.titlePlaceHolderFocusHandler
                }
              />
            </div>
            <div className={styles.textEditor}>
              <TextEditor
                ref={node => (this.rootNode = node)}
                value={body}
                editorChangeHandler={this.editorChangeHandler}
                bodyPlaceholderFocusInHandler={this.bodyPlaceholderFocusHandler}
                bodyPlaceholderFocusOutHandler={
                  this.bodyPlaceholderFocusHandler
                }
                imageUploadHandler={this.imageUploadHandler}
              />
            </div>
          </div>
          <div className={styles.buttonDiv}>
            <div>
              <button
                className={styles.publishButton}
                onClick={this.handleSubmit}
              >
                Publish
              </button>
              <button
                className={styles.draftButton}
                onClick={this.handleDraft}
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

CreateArticle.propTypes = {
  createArticle: PropTypes.func.isRequired,
  draftArticle: PropTypes.func.isRequired,
  getDrafts: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article,
  draft: state.drafts.newDraft,
  error: state.error
});

export default connect(
  mapStateToProps,
  { createArticle, draftArticle, getDrafts }
)(CreateArticle);
