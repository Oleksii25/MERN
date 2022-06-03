import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/htttp.hook";
import { useMessage } from "../hooks/message.hook";

const AuthPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { loading, request, err, clearErr } = useHttp();
  const showMessage = useMessage();

  const handleRegister = async () => {
    try {
      const data = await request('/api/auth/registration', 'POST', { ...form });
      showMessage(data.message)
    } catch (error) {

    }
  }

  const handleLogin = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      showMessage(data.message)
    } catch (error) {

    }
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (err) {
      showMessage(err);
      clearErr();
    }
  }, [err, showMessage, clearErr])

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
                  id="email"
                  type="email"
                  className="validate"
                  onChange={handleChange}
                  name="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  onChange={handleChange}
                  name="password"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" onClick={handleLogin}>Login</button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={handleRegister}
              disabled={loading}
            >Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage;