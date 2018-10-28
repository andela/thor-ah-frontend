import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import UserBio from '../../components/UserBio/UserBio';
import userProfile from '../../actions/userProfile';
import community from '../../actions/community';
import styles from './usersprofile.module.scss';

const { fetchUserProfile } = userProfile;
const { followUser, unFollowUser, fetchFollowing, checkIsFollowing } = community;

class UsersProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {};
    this.handleFollow = this.handleFollow.bind(this);
  }

  componentDidMount() {
    const { dispatch, match: { params: { username }} } = this.props;
    dispatch(fetchFollowing())
      .then((following) => {
        dispatch(checkIsFollowing(following, username));
      });
    dispatch(fetchUserProfile(username));
  }

  handleFollow() {
    const { dispatch, isFollowing, match: { params: { username }} } = this.props;
    if(isFollowing) {
      return dispatch(unFollowUser(username));
    }
    return dispatch(followUser(username))
  }

  render() {
    const { isFollowing, loading, loggedInUser, match: { params: { username }} } = this.props;
    return (
      <div className='user-profile'>
        {
          loading
          ? <i className={`fa fa-spinner fa-3x fa-spin ${styles.loading}`} />
          : null
        }
        {loggedInUser.username === username ? <Redirect to='/profile/user' /> : null}
        <UserBio viewOtherUser handleFollow={this.handleFollow} isFollowing={isFollowing} />
      </div>
    );
  }
}

UsersProfile.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isFollowing: state.userProfile.isFollowing,
  loading: state.userProfile.loading,
  loggedInUser: state.auth.user,
})

export default connect(mapStateToProps)(UsersProfile);
