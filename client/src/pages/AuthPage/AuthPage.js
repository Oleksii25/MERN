import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import { useInput } from "hooks";
import ValidationMessages from 'components/ValidationMessages';
import { emailRules, passRules } from "./constants";
import { useApi } from "hooks/useApi";
import { loginApi } from 'api/login.api';
import { registrationApi } from "api/registration.api";

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const email = useInput('', emailRules);
  const password = useInput('', passRules);
  const [isValidForm, setIsValidForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apiLogin = useApi(loginApi);
  const apiRegistr = useApi(registrationApi);

  const handleRegister = async () => {
    try {
      await apiRegistr.request({ email: email.value, password: password.value });
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleLogin = async () => {
    try {
      const data = await apiLogin.request({ email: email.value, password: password.value });
      login(data.token, data.userId)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (email.isValid && password.isValid) {
      setIsValidForm(true)
    } else {
      setIsValidForm(false)
    }
  }, [email.isValid, password.isValid])

  useEffect(() => {
    if (apiLogin.loading || apiRegistr.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [apiLogin.loading, apiRegistr.loading])

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Login</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  type="email"
                  className="validate"
                  onChange={email.onChange}
                  onBlur={email.onBlur}
                  value={email.value}
                />
                <label htmlFor="email">Email</label>
                <ValidationMessages validation={email.validation} isDirty={email.isDirty} />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="validate"
                  onChange={password.onChange}
                  onBlur={password.onBlur}
                  value={password.value}
                />
                <label htmlFor="password">Password</label>
                <ValidationMessages validation={password.validation} isDirty={password.isDirty} />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={handleLogin}
              disabled={isLoading || !isValidForm}
            >Login</button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={handleRegister}
              disabled={isLoading || !isValidForm}
            >Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage;