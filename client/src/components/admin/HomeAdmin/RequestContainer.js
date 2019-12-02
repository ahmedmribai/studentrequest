import React from "react";
import {Link} from 'react-router-dom';

const RequestContainer = () => {
  return (
    <div className="card border-primary mb-3">
      <div className="card-header">Waiting</div>
      <div className="card-body">
        <h4 className="card-title">Student Name</h4>
        <p className="card-text">Subject</p>
        <div className="row">
          <div className="col-4">
            <Link
              type="button"
              className="btn btn-outline-info btn-sm btn-block"
              to='/studentrequest'
            >
              See
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestContainer;
