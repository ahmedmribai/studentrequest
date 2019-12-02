import React, { Fragment } from "react";
import { connect } from "react-redux";

const AdminEditor = ({
  firstName,
  lastName,
  email,
  auth: { user },
  onSubmit,
  onChange
}) => {
  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <fieldset>
          <legend>Update your profile</legend>

          <div className="form-group ">
            <label htmlFor="inputSmall">First name</label>
            <input
              className="form-control form-control-sm"
              name="firstName"
              value={firstName}
              onChange={e => onChange(e)}
              type="text"
              placeholder={user && user.firstName}
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
              placeholder={user && user.lastName}
              id="inputSmall3"
              required
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
              placeholder={user && user.email}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <button type="submit" className="btn btn-primary">
            Done
          </button>
        </fieldset>
      </form>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminEditor);
