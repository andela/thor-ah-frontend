import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoX } from 'react-icons/go';
import signIn, { clearErrors } from '../../actions/SignIn';
import styles from './SignIn.module.css';
import SocialSignup from '../../components/SocialSignup';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    }
    this.signInTitle = "Welcome to Authors Haven";
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { props } = this
    props.dispatch(signIn(this.state));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value.trim() });
  }
  
  toggleModal() {
    const { props } = this
    props.dispatch(clearErrors());
    const { toggleModal } = this.props;
    toggleModal();
  }
  
  render() {
    const { error, signingIn } = this.props;
    return (
      <div id={styles.regModal}>
      <button className={styles.modalClose} type="button" onClick={this.toggleModal}>
        <span className={styles.xIcon}>
          <GoX />
        </span>
      </button>
        <div className={styles.regContainer}>
          <p className={styles.center} >{this.signInTitle}</p>

          <SocialSignup />

          {error ? <p
          id="invalid-credential"
          style={{ color: 'red', textAlign: 'center', marginBottom: '12px' }}>
          {error}</p> : null}
          <form onSubmit={this.handleSubmit}>
            <div className={styles.regForm}>
              <div className={styles.formItemGroup}>
                <input type="email" name="email" className={styles.formInput} id={styles.email}
                  placeholder="email" onChange={this.handleChange} required />
                <div id={`${styles.email}Err`} />
              </div>
              <div className={styles.formItemGroup}>
                <input type="password" name="password" className={styles.formInput} id={styles.password}
                  placeholder="password" onChange={this.handleChange} required />
                <div id={`${styles.password}Err`} />
              </div>
              <button type="submit" id="submit-btn" className={ signingIn ? `${styles.disabled_btn}` : '' }>Login </button>
            </div>
          </form>
          <p className={styles.center}> <Link to="/password/reset">Forgot Password? </Link> </p>
          <p className={styles.center}>Not yet registered? <Link to="/signInUser">Create an Account </Link> </p>

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { signInUser } = state;
  return {
    token: signInUser.token,
    user: signInUser.user,
    signingIn: signInUser.signingIn,
    error: signInUser.error,
  }
}

export default connect(mapStateToProps)(SignIn);
