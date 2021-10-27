import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import './AuthScreen.css';
import useForm from '../../components/useForm';
import validateLogin from '../../utils/validation-rules/loginFormValidationRules';
import {login} from '../../actions/userAction'

const LoginScreen = ({history}) => {
  const { values, errors, handleChange, handleSubmit } = useForm(handleLogin, validateLogin);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleRememberMe = () => setRememberMe(!rememberMe);
  const dispatch = useDispatch()

  function handleLogin() {
    dispatch(login(values.email, values.password))
  }

  const { loading, error, userInfo } = useSelector(state => state?.userLogin);
  
  const redirect = "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect ? redirect : '/');
    }

    if(error) console.log(error,"error");
  }, [userInfo, history, redirect, error]);

  return (
    <div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-user"></i>
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Email" name="email" value={values.email || ''} onChange={handleChange} />
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
            <input type="password" className="form-control" placeholder="Password" name="password" value={values.password || ''} onChange={handleChange} />
          </div>
          <div>{errors.password && (
            <p className="text-danger">{errors.password}</p>
          )}</div>
          <div className="row align-items-center remember">
            <input type="checkbox" checked={rememberMe} onChange={toggleRememberMe} />
            Remember Me
          </div>
          <div className="form-group">
            <input type="submit" value="Login" className="btn float-right login_btn" />
          </div>
        </form>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-center links">
          Don't have an account?
          <Link to="/auth" className="link">Sign Up</Link>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/auth/forget-password" className="link">Forgot your password?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
