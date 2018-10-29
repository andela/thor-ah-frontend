import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./ReportArticle.module.scss";
import reportArticle from "../../actions/reportArticle";

const modalRoot = document.getElementById("modal");

class ReportArticle extends Component {
  el = document.createElement("div");

  state = {
    reasonForReport: "",
    reportBody: "",
    message: "",
    error: "",
    loading: false
  };

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  clearErrorMessage = () => {
    this.setState({
      error: ""
    });
  };

  handleChange = event => {
    this.setState({
      reasonForReport: event.target.value
    });
    this.clearErrorMessage();
  };

  updateReportBody = event => {
    this.setState({
      reportBody: event.target.value
    });
    this.clearErrorMessage();
  };

  handleSubmitReport = event => {
    event.preventDefault();

    const { submitReport, articleslug } = this.props;
    const { reasonForReport, reportBody } = this.state;

    if (reasonForReport === "") {
      this.setState({
        error: "Please select a reason for the report"
      });
      return;
    }

    if (reasonForReport === "other" && reportBody === "") {
      this.setState({
        error: "Please type any other reason you might have below"
      });
      return;
    }

    this.setState({
      loading: true
    });

    submitReport(reasonForReport, reportBody, articleslug).then(response => {
      const { closeModal } = this.props;
      if (response && response.payload.status === "success") {
        this.setState({
          message: response.payload.message,
          loading: false
        });
        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    });
    this.setState({
      loading: false
    });
  };

  render() {
    const { closeModal, articleslug } = this.props;
    const { reasonForReport, error, message, loading } = this.state;
    return ReactDOM.createPortal(
      <Fragment>
        <div className={styles.reportArticle}>
          {/* eslint-disable-next-line */}
          <span className={styles.closeButton} onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </span>
          <div className={styles.reportArticleModal}>
            <span className={error.length === 0 ? "" : `${styles.reportError}`}>
              {error}
            </span>
            <span
              className={message.length === 0 ? "" : `${styles.reportSuccess}`}
            >
              {message}
            </span>
            <h2 className={styles.modalTitle}>Report article</h2>
            <div className={styles.reportReasons}>
              <li>
                <label>
                  <input
                    type="radio"
                    checked={reasonForReport === "it has violent content"}
                    onChange={this.handleChange}
                    value="it has violent content"
                  />
                  Violent Content
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    checked={reasonForReport === "this is hate speech"}
                    onChange={this.handleChange}
                    value="this is hate speech"
                  />
                  Hate Speech
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    checked={reasonForReport === "this is false news"}
                    onChange={this.handleChange}
                    value="this is false news"
                  />
                  False News
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    checked={reasonForReport === "it has pornographic content"}
                    onChange={this.handleChange}
                    value="it has pornographic content"
                  />
                  Pornographic Content
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    checked={reasonForReport === "it is a spam"}
                    onChange={this.handleChange}
                    value="it is a spam"
                  />
                  Spam Content
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    checked={reasonForReport === "other"}
                    onChange={this.handleChange}
                    value="other"
                  />
                  Other
                </label>
              </li>
            </div>
            <div>
              <form
                onSubmit={this.handleSubmitReport}
                className={styles.reportForm}
                articleslug={articleslug}
              >
                <textarea
                  onChange={this.updateReportBody}
                  className={styles.reportBody}
                  placeholder="Further complaints? Make them here"
                />
                <div className={styles.buttonGroup}>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>,
      modalRoot
    );
  }
}

ReportArticle.propTypes = {
  submitReport: PropTypes.func.isRequired,
  articleslug: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.reportArticle.error,
  message: state.reportArticle.message,
  loading: state.reportArticle.loading
});

const mapDispatchToProps = dispatch => ({
  submitReport(reasonForReport, reportBody, articleslug) {
    return dispatch(reportArticle(reasonForReport, reportBody, articleslug));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportArticle);
