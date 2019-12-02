import React from "react";
import RequestContainer from '../HomeAdmin/RequestContainer';

const RequestsContainer = () => {
  return (
    <div className="requests-list-container">
      <h3>Requests list</h3>

      <div>
        <div className="row">
          <div className="col-sm-6">
            <RequestContainer />
          </div>
          <div className="col-sm-6">
            <RequestContainer />
          </div>
          <div className="col-sm-6">
            <RequestContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsContainer;
