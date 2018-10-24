import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserBio from '../../components/UserBio/UserBio';
import userProfile from '../../actions/userProfile';

const { fetchUserProfile } = userProfile;

class UsersProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const { dispatch, match: { params: { username }} } = this.props;
    dispatch(fetchUserProfile(username));
  }

  render() {
    return (
      <div className='user-profile'>
        <UserBio viewOtherUser />
      </div>
    );
  }
}

export default connect()(UsersProfile);
