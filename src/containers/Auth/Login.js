import React from 'react';

import './Login.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
        }
    }

    handleOnChangeUsername = event => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleShowHidePassword = event => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }


    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group input-login">
                            <label htmlFor="">Username</label>
                            <input 
                            type="text" 
                            className='form-control' 
                            placeholder='Enter your username'
                            value={this.state.username}
                            onChange={(event) => this.handleOnChangeUsername(event)}/>
                        </div>
                        <div className="col-12 form-group input-login">
                            <label htmlFor="">Password</label>
                            <div className="custom-input-password">
                                <input 
                                type={this.state.isShowPassword ? "text" : 'password'} 
                                className='form-control' 
                                placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassword(event)}/>
                                <span onClick={(event) => this.handleShowHidePassword(event)}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className='btn-login'>Login</button>
                        </div>
                        <div className="forgot-password mt-2">
                            Forgot your password?
                        </div>
                        <div className="col-12 other-login mt-3">Or sign in with:</div>
                        <div className="col-12 social-login mt-2 mb-3">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    
                    
                    
                    </div>
                </div>

            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default Login;

