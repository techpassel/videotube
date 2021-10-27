import React from 'react'
import { Switch, useRouteMatch, Route, useLocation } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import './AuthScreen.css'

const AuthScreen = () => {
    let location = useLocation().pathname;
    let match = useRouteMatch();
    return (
        <div className="main_container d-flex aligns-items-center justify-content-center">
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className={`card ${location === '/auth'?'signup-card':'login-card'}`}>
                        <div className="card-header">
                            <h3>{!location.includes('login') ? 'Sign Up' : 'Sign In'}</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span>
                                    <i className="fab fa-facebook-square"></i>
                                </span>
                                <span>
                                    <i className="fab fa-google-plus-square"></i>
                                </span>
                                <span>
                                    <i className="fab fa-twitter-square"></i>
                                </span>
                            </div>
                        </div>
                        <Switch>
                            <Route path={`${match.path}/login`} component={LoginScreen} />
                            <Route path={match.path} component={SignupScreen} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthScreen
