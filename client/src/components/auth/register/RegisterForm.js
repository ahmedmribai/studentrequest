import React, { Fragment } from "react";

const RegisterForm = ({
  firstName,
  lastName,
  birthDate,
  classRoom,
  registerNumber,
  email,
  password,
  jobTitle,
  onChange,
  onSubmit,
  status, 
  disableAdmin,
  disableStudent
}) => {
  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <fieldset>
          <legend>Register</legend>
          <div className="form-group">
            <label htmlFor="exampleSelect1">Status</label>
            <select
              name="status"
              value={status}
              onChange={e => onChange(e)}
              className="form-control"
              id="exampleSelect1"
            >
              <option>student</option>
              <option>admin</option>
            </select>
          </div>
          <div className="form-group ">
            <label htmlFor="inputSmall">First name</label>
            <input
              className="form-control form-control-sm"
              name="firstName"
              value={firstName}
              onChange={e => onChange(e)}
              type="text"
              placeholder="..."
              id="inputSmall"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSmall3">Last name</label>
            <input
              className="form-control form-control-sm"
              name="lastName"
              value={lastName}
              onChange={e => onChange(e)}
              type="text"
              placeholder="..."
              id="inputSmall3"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputDate">Birth date</label>
            <input
              name="birthDate"
              value={birthDate}
              onChange={e => onChange(e)}
              type="date"
              className="form-control"
              id="exampleInputDate"
              readOnly={disableAdmin}
            />
            <div className="input-group-addon">
              <span className="glyphicon glyphicon-th"></span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputSmall">Classroom</label>
            <input
              name="classRoom"
              value={classRoom}
              onChange={e => onChange(e)}
              className="form-control form-control-sm"
              type="text"
              placeholder="..."
              id="inputSmall1"
              readOnly={disableAdmin}
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtNumber">Register number</label>
            <input
              name="registerNumber"
              value={registerNumber}
              onChange={e => onChange(e)}
              id="txtNumber"
              placeholder="number only"
              type="text"
              className="form-control"
              maxLength="2"
              readOnly={disableAdmin}
            />
          </div>
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
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword">Password</label>
            <input
              name="password"
              value={password}
              onChange={e => onChange(e)}
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSmall">Job title</label>
            <input
              name="jobTitle"
              value={jobTitle}
              onChange={e => onChange(e)}
              className="form-control form-control-sm"
              type="text"
              placeholder="..."
              id="inputSmall2"
              readOnly={disableStudent}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
