import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AdminProfile = ({ auth: { user } }) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Profile
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {user && user.firstName} 's profile.
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <div className="row">
                  <label htmlFor="inputSmall">First Name : </label>{" "}
                  <p> {user && user.firstName}</p>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <label htmlFor="inputSmall">Last Name :</label>
                  <p>{user && user.lastName}</p>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <label htmlFor="inputSmall">Email :</label>
                  <p>{user && user.email}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <Link
                type="button"
                className="btn btn-primary"
                to="/updatestudent"
              >
                update
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminProfile);
