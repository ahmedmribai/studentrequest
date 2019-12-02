import React from "react";
import logo from "../../images/STUDENT-APP.jpg";

const Spinner = () => {
  return (
    <div style={style} >
      <img src={logo} alt="Logo" />
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

const style = {
  position: "fixed",
  top: "50%",
  left: "45%",
  transform: "translate(-50%, -50%)"
};

export default Spinner;
