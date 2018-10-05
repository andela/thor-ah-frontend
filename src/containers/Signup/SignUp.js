import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import signUp from '../../actions/user.signup';
import styles from './SignUp.module.css';
import SocialSignup from '../../components/SocialSignup'

const clearError = (event) => {
    document.getElementById(`${event.target.id}Err`).innerHTML = "";
}

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: ""
        }
        this.showErrors = true
        this.signUpTitle = "Welcome to Authors Haven";
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.showErrors = true;
        const { dispatch } = this.props;
        dispatch(signUp(this.state))
    }

    render() {
        const { user, error, toggleModal, loading } = this.props;
        if (this.showErrors && error && error.error) {
            Object.keys(error.error).map(key => {
                document.getElementsByName(`${key}Err`)[0].innerHTML = error.error[key]
                return 0
            })
            this.showErrors = false;
        } else if (user && user.user && user.user.token) {
            toggleModal(); // dissable modal
        }

        let submitBtn = <button type="submit" id={styles.submitBtn} >Signup </button>
        if (loading) {
            submitBtn = <button type="submit" id={styles.submitBtn} disabled>Signup </button>
        }

        return (
            < div id={styles.regModal} >

                <div className={styles.regContainer}>
                    <p className={styles.center} >{this.signUpTitle}</p>

                    <SocialSignup />
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.regForm}>

                            <div className={styles.formItemGroup}>
                                <div>
                                    <div className={styles.errMsg} name="firstNameErr" id={`${styles.firstName}Err`} />
                                    <input type="text" name="firstName" className={styles.formInput} id={styles.firstName}
                                        placeholder="firstname" onChange={this.handleChange}
                                        onFocus={clearError} required />
                                </div>
                                <div>
                                    <div className={styles.errMsg} name="lastNameErr" id={`${styles.lastName}Err`} />
                                    <input type="text" name="lastName" className={styles.formInput} id={styles.lastName}
                                        placeholder="lastname" onChange={this.handleChange}
                                        onFocus={clearError} required />
                                </div>
                            </div>

                            <div className={styles.formItemGroup}>
                                <div>
                                    <div className={styles.errMsg} name="usernameErr" id={`${styles.username}Err`} />
                                    <input type="text" name="username" className={styles.formInput} id={styles.username}
                                        placeholder="username" onChange={this.handleChange}
                                        onFocus={clearError} required />
                                </div>
                                <div>
                                    <div className={styles.errMsg} name="emailErr" id={`${styles.email}Err`} />
                                    <input type="email" name="email" className={styles.formInput} id={styles.email}
                                        placeholder="email" onChange={this.handleChange}
                                        onFocus={clearError} required />
                                </div>
                            </div>

                            <div className={styles.formItemGroup}>
                                <div className={styles.errMsg} name="passwordErr" id={`${styles.password}Err`} />
                                <input type="password" name="password" className={styles.formInput} id={styles.password}
                                    placeholder="password" onChange={this.handleChange}
                                    onFocus={clearError} required />
                            </div>
                            <div className={styles.formItemGroup}>
                                {submitBtn}
                            </div>
                        </div>
                    </form>
                    <p className={styles.center}>Already Have an Account? <Link to="/auth/login"> Login </Link> </p>

                </div>

            </div >
        )
    }

}

const mapStateToProps = (state) => {
    const { users } = state;
    return {
        token: users.token,
        user: users.user,
        loading: users.loading,
        error: users.error,
    }
}

export default connect(mapStateToProps)(SignUp)
// export default SignUp;
