import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './AuthScreen.css'
import useForm from '../../components/useForm'
import validateSignup from '../../utils/validation-rules/signupFormValidationRules'
import { signup } from '../../actions/userAction'

const SignupScreen = ({ history }) => {
    const [rememberMe, setRememberMe] = useState(false);
    const toggleRememberMe = () => setRememberMe(!rememberMe);
    const { values, errors, handleChange, handleSubmit } = useForm(handleSignup, validateSignup);
    const dispatch = useDispatch();

    const {signupLoading, signupError} = useSelector(state => state?.userSignup);
    const {userInfo } = useSelector(state => state?.userLogin);
    const redirect = "/";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect ? redirect : '/');
        }

        if (signupError) console.log(signupError, "error");
    }, [userInfo, history, redirect, signupError]);

    function handleSignup() {
        dispatch(signup(values.firstName, values.lastName, values.email, values.password))
    }

    return (
        <div>
            <div className="card-body signup-card-body">
                <form onSubmit={handleSubmit}>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="firstName" value={values.firstName || ''} onChange={handleChange} placeholder="First Name" />
                    </div>
                    <div>{errors.firstName && (
                        <p className="text-danger">{errors.firstName}</p>
                    )}</div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="lastName" value={values.lastName || ''} onChange={handleChange} placeholder="Last Name" />
                    </div>
                    <div>{errors.lastName && (
                        <p className="text-danger">{errors.lastName}</p>
                    )}</div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="email" value={values.email || ''} onChange={handleChange} placeholder="Email" />
                    </div>
                    <div>{errors.email && (
                        <p className="text-danger">{errors.email}</p>
                    )}</div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-key"></i>
                            </span>
                        </div>
                        <input type="password" className="form-control" name="password" value={values.password || ''} onChange={handleChange} placeholder="Password" />
                    </div>
                    <div>{errors.password && (
                        <p className="text-danger">{errors.password}</p>
                    )}</div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-key"></i>
                            </span>
                        </div>
                        <input type="password" className="form-control" name="confirmPassword" value={values.confirmPassword || ''} onChange={handleChange} placeholder="Confirm Password" />
                    </div>
                    <div>{errors.confirmPassword && (
                        <p className="text-danger">{errors.confirmPassword}</p>
                    )}</div>
                    <div className="row align-items-center remember">
                        <input type="checkbox" checked={rememberMe} onChange={toggleRememberMe} />
                        Remember Me
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn float-right login_btn" />
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-center links">
                    Already have an account?
                    <Link to="/auth/login" className="link">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default SignupScreen
