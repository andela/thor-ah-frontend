/* eslint-disable */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";


import ArticleTitle from "../CreateArticle/ArticleTitle";
import TextEditor from "../CreateArticle/TextEditor";
import stripHtml from "../../utils/stripHtml";

import { getArticle } from '../../actions/article';
import { updateArticle, publishDraft } from '../../actions/updateArticle';
import { getDrafts } from '../../actions/drafts';
import isEmpty from '../../utils/isEmpty';

// Styles
import styles from "../CreateArticle/CreateArticle.module.scss";

class UpdateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      message: "",
      loading: true,
      error: {
        title: "",
        body: "",
        message: ""
      }
    };
  }

  componentDidMount() {
    const {
      getArticle: fetchArticle,
      match: { params: { slug: articleSlug } },
    } = this.props;
    fetchArticle(articleSlug);
  }

  componentWillReceiveProps(nextProps) {

    const { article } = nextProps;

    const title = !isEmpty(article.title) ? article.title : '';
    const body = !isEmpty(article.body) ? article.body : '';
    const published = article.published

    this.setState({
      title,
      body,
      published,
      loading: false,
    });
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


  imageUploadHandler = (blobInfo, success, failure) => {
    const { REACT_APP_CLOUDINARY_API_KEY, REACT_APP_UPLOAD_PRESET, REACT_APP_UPLOAD_URL } = process.env;
    try {
      const formData = new FormData();
      formData.append("file", blobInfo.blob());
      formData.append("upload_preset", REACT_APP_UPLOAD_PRESET);
      formData.append("api_key", REACT_APP_CLOUDINARY_API_KEY);
      return axios
        .post(REACT_APP_UPLOAD_URL, formData, {
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

    if (title.trim() === "") {
      this.setState({ title });
    }

    if (body.trim() === "" || bodyValue.length < 30) {
      this.setState({ body });
    }

    this.setState({
      error: {}
    });

    return true;
  };

  updateSuccess = (article) => {
    this.setState({ loading: false }, () => {
      if (article && !article.loading) {
        if (!(article.published)) {
          this.props.getDrafts()
          this.props.history.push('/me/drafts');
        }
        if (article.published) {
          const { articleUpdate: { data: { slug } } } = this.props;
          this.props.history.push(`/articles/${slug}`);
        }
      }
    })
  }


  updateContent = async () => {
    const { title, body } = this.state;
    const { updateArticle,
      match: { params: { slug } },
      article
    } = this.props;


    const description = stripHtml(body).slice(0, 200);
    const updates = {
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
    
    await updateArticle(updates, slug)
  };

  handleUpdate = () => {
    const { article } = this.props;
    this.updateContent().then(() => {
      this.updateSuccess(article);
    })
  }

  componentWillUnmount() {
    return this.updateContent();
  }

  publishSuccess() {
    this.setState({
      loading: false,
      message: "You have successfully published this article"
    }, () => {
      const { articleUpdate: { data: { slug } } } = this.props;
      this.props.history.push(`/articles/${slug}`);
    });
  }

  handlePublish = () => {
    const { title, body } = this.state;
    const { publishDraft,
      match: { params: { slug } }
    } = this.props;


    const description = stripHtml(body).slice(0, 200);
    const updates = {
      title,
      body,
      description,
    };

    if (this.validateArticle() === false) {
      return;
    }
    this.setState({ loading: true }, async () => {
      const response = await publishDraft(updates, slug)
      if (response) {
        this.publishSuccess();
      }
    })
  };


  render() {
    const { title, body, error, loading, message } = this.state;
    const { article } = this.props;

    if (loading) {
      return (
        <div className='loading-spinner'>
          <i className='fa fa-3x fa-spinner fa-spin' />
        </div>
      )
    }

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
        <div className="col-md-8 col-sm-10 col-12 mx-auto my-5">
          <div className={styles.createArticle}>
            <div className={styles.articleTitle}>
              <ArticleTitle
                value={title}
                titleChangeHandler={this.titleChangeHandler}
              />
            </div>
            <div className={styles.textEditor}>
              <TextEditor
                ref={node => (this.rootNode = node)}
                value={body}
                editorChangeHandler={this.editorChangeHandler}
                imageUploadHandler={this.imageUploadHandler}
              />
            </div>
          </div>
          <div className={styles.buttonDiv}>
            <div>
              <button
                className={styles.publishButton}
                onClick={this.handleUpdate}
                type='submit'
              >
                Update
              </button>
              {
                !article.published ?
              <button
                className={styles.draftButton}
                onClick={this.handlePublish}
                type='submit'
              > Publish </button> : null
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

UpdateArticle.propTypes = {
  getArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  getDrafts: PropTypes.func.isRequired,
  publishDraft: PropTypes.func.isRequired,
  articleUpdate: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  article: state.oneArticleReducer.article,
  articleUpdate: state.articleUpdate
});

export default connect(
  mapStateToProps,
  { getArticle, updateArticle, getDrafts, publishDraft }
)(UpdateArticle);
