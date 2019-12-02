import React from "react";

const StudentRequestForm = () => {
  return (
    <div className="row page-inner">
      <div className="col-sm-6 offset-sm-3">
        <div className="form-group">
          <label
            className="col-form-label col-form-label-sm"
            htmlFor="inputSmall"
          >
            Student Name
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Student name"
            id="inputSmall"
          />
        </div>
        <div class="form-group">
          <label
            className="col-form-label col-form-label-sm"
            htmlFor="inputSmall"
          >
            Subject
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="subject"
            id="inputSmall"
          />
        </div>
        <div class="form-group">
          <label for="exampleTextarea">Text</label>
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default StudentRequestForm;
