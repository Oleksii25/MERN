import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import { useInput } from "hooks";
import ValidationMessages from 'components/ValidationMessages';
import { emailRules, passRules } from "./constants";
import { useApi } from "hooks/useApi";
import { loginApi } from 'api/login.api';
import { registrationApi } from "api/registration.api";
import Button from "components/Button/Button";
import Input from "components/Input/Input";

import styles from './AuthPage.scss';

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
    <div className={styles.authPage}>
      <div className={styles.authPage__logo}>Logo</div>
      <div className={styles.authPage__popup}>
        <h1>Authorization</h1>
        <div className={styles.authPage__fields}>
          <div className={styles.authPage__inputs}>
            <div className={styles.authPage__email}>
              <Input
                type="email"
                onChange={email.onChange}
                onBlur={email.onBlur}
                value={email.value}
                label='Email'
              />
              <ValidationMessages validation={email.validation} isDirty={email.isDirty} />
            </div>
            <div className={styles.authPage__password}>
              <Input
                type="password"
                onChange={password.onChange}
                onBlur={password.onBlur}
                value={password.value}
                label='Password'
              />
              <ValidationMessages validation={password.validation} isDirty={password.isDirty} />
            </div>
          </div>
          <div className={styles.authPage__buttons}>
            <Button
              className={`${styles.authPage__button}`}
              onClick={handleLogin}
              disabled={isLoading || !isValidForm}
            >
              Login
            </Button>
            <Button
              className={`${styles.authPage__button}`}
              onClick={handleRegister}
              disabled={isLoading || !isValidForm}
            >
              Registration
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage;