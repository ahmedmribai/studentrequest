import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({
  email,
  password,
  admin,
  onChange,
  onSubmit,
  onChangeAdmin
}) => {
  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <fieldset>
          <legend>Signin</legend>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              name="email"
              value={email}
              onChange={e => onChange(e)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="email@example.com"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              name="password"
              value={password}
              onChange={e => onChange(e)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitch1"
              defaultChecked={admin}
              onClick={e => onChangeAdmin(e)}
              name="admin"
            />
            <label className="custom-control-label" htmlFor="customSwitch1">
              Admin
            </label>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
      <div id="formFooter">
        <Link className="underlineHover" to="#">
          Forgot Password?
        </Link>
      </div>
      <div className="register-info-box">
        <h4>Don't have an account?</h4>
        <Link type="submit" className="btn btn-primary" to="/register">
          Register
        </Link>
      </div>
    </Fragment>
  );
};

export default LoginForm;
