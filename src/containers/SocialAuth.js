import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { handleSocialAuth } from '../actions/signIn';
import styles from './socialAuth.module.scss';



class SocialAuth extends Component {
  constructor(props) {
    super(props)

    this.state = {};
  }

  componentDidMount() {
    const { location, socialAuth } = this.props;
    const authCallbackUrl = `${location.pathname}${location.search}`;
    socialAuth(authCallbackUrl);
  }

  render() {
    const { isAuthenticated, error } = this.props;
    if (!isAuthenticated) {
      if(error) {
        swal("Oops", error, "error")
        return <Redirect to = "/" / >
      }
      return (
        <div className={styles.loader}>
          <i className={`fa fa-spinner fa-5x fa-spin ${styles.spinner}`} />
        </div>
      );
    }
    return (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.signin.error,
});

const mapDispatchToProps = (dispatch) => ({
  socialAuth(url) {
    return dispatch(handleSocialAuth(url));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialAuth);
