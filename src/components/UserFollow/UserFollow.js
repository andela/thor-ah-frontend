import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchUserFollow from '../../actions/userFollow';
// styles
import styles from './UserFollow.module.scss';


class UserFollow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserFollow());
  }

  render() {
    const { userFollow } = this.props;
    const { loading, follows, errors } = userFollow;
    
    return (
      <div className={styles.follow_container }>
        <ul className={ errors ? styles.with_error : '' }>
          <li>
            {loading ? 
              <span className={styles.loading} ><i className='fa fa-1x fa-spinner fa-spin' /></span> : 
              <span className={styles.counts}>{ follows.followers }</span> }
            <span className={styles.names}>Followers</span>
          </li>
          { errors ? <li className={ styles.follow_error }>Error Occurred</li> : '' }
          <li>
            {loading ? 
              <span className={styles.loading} ><i className='fa fa-1x fa-spinner fa-spin' /></span> : 
              <span className={styles.counts}>{ follows.following }</span> }
            <span className={ styles.names }>Following</span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userFollow } = state;
  return {
    userFollow,
  }
}

export default connect(mapStateToProps)(UserFollow);
