import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserBio from '../../components/UserBio/UserBio';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import styles from './following.module.scss';
import community from '../../actions/community';

const { fetchFollowing } = community;

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFollowing())
  }

  render() {
    const { following, loading } = this.props;
    return (
      <div className="user-profile">
        <UserBio />
        <div className={styles.following}>
          <hr />
          {
            loading
            ? <i className={`fa fa-spinner fa-3x fa-spin ${styles.loading}`} />
            : null
          }
          {following.length ? <h1 className={styles.heading}>People followed by John Doe</h1> : ''}
          {following.map((user) => <UserProfileCard key={user.id} user={user} />)}
        </div>
      </div>
    );
  }
}

Following.propTypes = {
  following: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  following: state.community.following.data,
  loading: state.community.following.loading,
})


export default connect(mapStateToProps)(Following);
