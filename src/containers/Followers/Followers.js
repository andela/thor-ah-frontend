import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserBio from '../../components/UserBio/UserBio';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import styles from './followers.module.scss';
import community from '../../actions/community';

const { fetchFollowers } = community;

class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFollowers());
  }

  render() {
    const { followers, loading } = this.props;
    return (
      <div className="user-profile">
        <UserBio />
        <div className={styles.followers}>
          <hr />
          {
            loading
            ? <i className={`fa fa-spinner fa-3x fa-spin ${styles.loading}`} />
            : null
          }
          {followers.length ? <h1 className={styles.heading}>People following John Doe</h1> : ''}
          {followers.map((user) => <UserProfileCard key={user.id} user={user} />)}
        </div>
      </div>
    );
  }
}

Followers.propTypes = {
  followers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  followers: state.community.followers.data,
  loading: state.community.followers.loading,
});

export default connect(mapStateToProps)(Followers);
