import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Switch from "react-switch";
//  actions
import {
  emailNotifyOptOut,
  emailNotifyOptIn,
  emailNotifyStatus
} from "../../actions/settings";
// styles
import styles from "./Settings.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleArticleChange = this.handleArticleChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  componentDidMount() {
    const { fetchNotifyStatus, user } = this.props;
    fetchNotifyStatus(user.email);
  }

  handleArticleChange = (checked) => {
    const { fetchNotifyOptOutStatus, fetchNotifyOptInStatus, user } = this.props;
    const { email } = user;
    if (checked) {
      fetchNotifyOptOutStatus("10989", email);
    }
    else {
      fetchNotifyOptInStatus("10989", email);
    }
  };

  handleCommentChange(checked) {
    const { fetchNotifyOptOutStatus, fetchNotifyOptInStatus, user } = this.props;
    const { email } = user;
    if (checked) {
      fetchNotifyOptOutStatus("10990", email);
    }
    else {
      fetchNotifyOptInStatus("10990", email);
    }
  }

  render() {
    const { settings } = this.props;
    const { notifyArticle, notifyComment } = settings;
    return (
      <section className="container ">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className={`${styles.heading} h1`}>Settings</h1>
            <div className={`${styles.setting} d-flex`}>
              <div>
                <h3>Articles Notification</h3>
                <p>
                  We&apos;ll send you email notifications for new articles
                  published based on people you follow on Author&apos;s Haven
                </p>
              </div>
              <div>
                <Switch
                  onChange={this.handleArticleChange}
                  checked={notifyArticle}
                  className="m-3"
                />
              </div>
            </div>
            <div className={`${styles.setting} d-flex`}>
              <div>
                <h3> Comments Notification</h3>
                <p>
                  We&apos;ll send you email notifications for comments and
                  replies activities on Authors Haven.
                </p>
              </div>
              <div>
                <Switch
                  onChange={this.handleCommentChange}
                  checked= {notifyComment}
                  className="m-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  fetchNotifyOptInStatus: PropTypes.func.isRequired,
  fetchNotifyOptOutStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  fetchNotifyOptOutStatus(groupId, email) {
    dispatch(emailNotifyOptOut(groupId, email));
  },
  fetchNotifyOptInStatus(groupId, email) {
    dispatch(emailNotifyOptIn(groupId, email));
  },
  fetchNotifyStatus(email) {
    dispatch(emailNotifyStatus(email));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
