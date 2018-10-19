import React, { Component } from 'react'
import { connect } from 'react-redux';
import updateUser, { uploadPhoto as uploadProfilePhoto } from '../../actions/updateUser';
import styles from './updateProfile.module.scss';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = { profilePhoto: '', ...user };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onFileChange = event => {
    event.preventDefault();
    this.setState({ profilePhoto: event.target.value })
    const { dispatch } = this.props;
    dispatch(uploadProfilePhoto(event.target.files[0]))
      .then((data) => {
        if (data) {
          const { url } = data;
          this.setState({ image: url });
        }
      })
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(updateUser({ ...this.state }));
  }

  uploadState = (props) => {
    const { photo, error, loading } = props;
    let res = '';
    if (error) {
      res = <span className={ styles.error }><i className='fa fa-times' /></span>;
    } else if(loading) {
      res = <span className={ styles.loading }><i className='fa fa-1x fa-spinner fa-spin' /></span>;
    } else if(photo !== '') {
      res = <span className={ styles.success }><i className='fa fa-check' /></span>;
    } else {
      res = '';
    }
    return res;
  }

  render() {
    const { profilePhoto, firstName, lastName, role, email, username, twitter, linkedin, bio } = this.state;
    const { uploadPhoto, userStore } = this.props;
    const { error } = uploadPhoto;
    
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className={styles.form_input_group}>
            <div className={ styles.rear }>
              <label htmlFor="ProfilePhoto">ProfilePhoto</label>
              { !error ? '' : <span className={ styles.right }>{ error }</span> }
            </div>
            <input type="file" onChange={this.onFileChange} name="image" value={profilePhoto || ''} placeholder="Profile photo" />
            <span className={styles.upload_photo}>
              { this.uploadState(uploadPhoto) }
            </span>
          </div>
          <div className={styles.form_input_group}>
            <label htmlFor="FirstName">Firstname</label>
            <input type="text" onChange={this.onChange} name="firstName" value={firstName || ' '} placeholder="Firstname" />
          </div>
          <div className={styles.form_input_group}>
            <label htmlFor="LastName">Lastname</label>
            <input type="text" onChange={this.onChange} name="lastName" value={lastName || ' '} placeholder="Lastname" />
          </div>
          <div className={styles.form_input_group}>
            <label htmlFor="Email">Email</label>
            <input type="email" onChange={this.onChange} readOnly name="email" value={email || ''} placeholder="Email Address" />
          </div>
          <div className={styles.form_input_group}>
            <label htmlFor="Username">Username</label>
            <input type="text" onChange={this.onChange} name="username" readOnly value={username || ''} placeholder="Username" />
          </div>
          <div className={styles.form_input_group}>
            <label htmlFor="Role">Role</label>
            <input type="text" onChange={this.onChange} readOnly name="role" value={role || ''} placeholder="Role" />
          </div>
          <div className={styles.form_input_group}>
            <label htmlFor="Twitter">Twitter</label>
            <input type="text" onChange={this.onChange} name="twitter" value={twitter || ' '} placeholder="Twitter profile URL" />
          </div>
          <div className={styles.form_input_group}>
            <label htmlFor="LinkedinURL">Linkedin</label>
            <input type="url" onChange={this.onChange} name="linkedin" value={linkedin || ' '} placeholder="Linkedin Profile URL" />
          </div>
          <div className={styles.form_input_group}>
            <label htmlFor="Bio">Bio</label>
            <textarea row="4" onChange={this.onChange} name="bio" value={bio || ''} placeholder="Bio" />
          </div>
          <div className={ styles.form_message_foot }>
            {userStore.error ? <div className={styles.form_message_foot_error}> {userStore.error} </div> : ''}
            {Object.keys(userStore.user).length > 1 && !userStore.error ? <div className={styles.form_message_foot_success}> Profile update successfully </div> : ''}
          </div>
          <div className={styles.form_input_group}>
            <button type="submit"
            disabled={ userStore.loading ? 'disabled': '' }
            style={ userStore.loading ? { background: '#ccc', border: '1px solid #ccc', color: '#eee', cursor: 'no-drop', } : {} }>
            {userStore.loading ? <span><i className='fa fa-1x fa-spinner fa-spin' /> loading</span>  : 'Update Profile' }
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { auth, uploadPhoto, userStore } = state;
  const { user } = auth;
  return {
    user,
    uploadPhoto,
    userStore,
  }
}

export default connect(mapStateToProps)(UserInfo);
