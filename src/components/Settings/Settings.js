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
    this.state = {
      // checked: false,
      // articleChecked: true,
      // commentChecked: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchNotifyStatus, user } = this.props;
    fetchNotifyStatus(user.email);
  }

  handleChange = (checked, event, id) => {
    console.log("checked", checked, id);
    const {
      fetchNotifyOptOutStatus,
      fetchNotifyOptInStatus,
      user,
      settings
    } = this.props;
    const { notifyArticle, notifyComment } = settings;
    const { email } = user;
    notifyArticle
      ? fetchNotifyOptOutStatus(id, email)
      : fetchNotifyOptInStatus(id, email);
    notifyComment
      ? fetchNotifyOptOutStatus(id, email)
      : fetchNotifyOptInStatus(id, email);
    if (id === "10989") {
      !notifyArticle;
    } else {
      !notifyComment;
    }
  };

  render() {
    const { settings } = this.props;
    console.log(settings);
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
                  onChange={this.handleChange}
                  checked={notifyArticle}
                  id="10989"
                  className="m-3"
                  aria-labelledby="neat-label"
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
                  onChange={this.handleChange}
                  checked={notifyComment}
                  id="10990"
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
