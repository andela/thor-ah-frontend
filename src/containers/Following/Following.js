import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import UserBio from '../../components/UserBio/UserBio';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import styles from './following.module.scss';
import community from '../../actions/community';
import fetchUserFollow from '../../actions/userFollow';

const { fetchFollowing, removeUserFromFollowing, unFollowUser } = community;

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFollowing())
  }

  handleUnfollow(e) {
    const { dispatch } = this.props;
    const { user, index } = e.target.dataset;
    swal({
        title: "Are you sure?",
        text: "If you click 'OK', the user will be removed from your list",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(unFollowUser(user))
            .then(() => {
              dispatch(removeUserFromFollowing(index));
              swal(`You no longer follow ${user}`, {
                icon: "success",
              });
              dispatch(fetchUserFollow());
            })
        }
      });
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
          {following.map((user, idx) => <UserProfileCard handleUnfollow={this.handleUnfollow} idx={idx} key={user.id} user={user} showButton />)}
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
