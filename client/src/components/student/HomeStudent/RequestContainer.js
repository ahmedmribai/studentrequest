import React from "react";

const RequestContainer = () => {
  return (
    <div className="card border-primary mb-3">
      <div className="card-header">IN REQUEST</div>
      <div className="card-body">
        <h4 className="card-title">Primary card title</h4>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <div className="row">
          <div className="col-4">
            <button
              type="button"
              className="btn btn-outline-info btn-sm btn-block"
            >
              See
            </button>
          </div>

          <div className="col-4">
            <button
              type="button"
              className="btn btn-outline-warning btn-sm btn-block"
            >
              Modify
            </button>
          </div>

          <div className="col-4">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm btn-block"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestContainer;
