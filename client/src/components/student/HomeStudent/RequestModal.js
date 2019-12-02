import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeRequest } from "../../request/requestActions/auth";

const RequestModal = ({ makeRequest }) => {
  const [formData, setFormData] = useState({ subject: "", text: "" });
  const { subject, text } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    makeRequest(subject, text)
      .then(res => {
        alert("request sent");
      })
      .catch(err => {
        alert("can not send request");
      });
  };

  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Make new request
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
                  Make a request to your school.
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
                  <label htmlFor="inputSmall">Subject</label>
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Request subject"
                    id="inputSmall"
                    onChange={e => onChange(e)}
                    name="subject"
                    value={subject}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleTextarea">Text</label>
                  <textarea
                    className="form-control"
                    id="exampleTextarea"
                    rows="3"
                    onChange={e => onChange(e)}
                    value={text}
                    name="text"
                  ></textarea>
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
                <button type="button" className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

RequestModal.propTypes = {
  makeRequest: PropTypes.func.isRequired
};

/*const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});*/

export default connect(null, { makeRequest })(RequestModal);
