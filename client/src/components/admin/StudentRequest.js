import React from "react";
import StudentRequestForm from "./StudentRequestForm";
import Response from "./Response";

const StudentRequest = () => {
  return (
    <div style={styles.container} className="row page-inner">
      <div className="col-sm-8 offset-sm-2">
        <StudentRequestForm />
        <Response />
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: 30,
    marginBottom: 20
  }
};

export default StudentRequest;
