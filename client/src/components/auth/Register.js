import React, { useState } from "react";
import { connect } from "react-redux";
import RegisterForm from "./register/RegisterForm";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import register from "../../actions/auth";
import Spinner from "../../components/layout/Spinner";

const Register = ({ register, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    classRoom: "",
    registerNumber: "",
    email: "",
    password: "",
    jobTitle: "", 
    status: "student",
    disableStudent: true,
    disableAdmin: false
  });

  const {
    firstName,
    lastName,
    birthDate,
    classRoom,
    registerNumber,
    email,
    password,
    jobTitle,
    status,
    disableAdmin,
    disableStudent
  } = formData;

  if (isAuthenticated) {
    if (localStorage.admin === "true") {
      return <Redirect to="/homeadmin" />;
    }
    if (localStorage.admin === "false") {
      return <Redirect to="/homestudent" />;
    }
  }

  const onChange = e => {
    if (e.target.name !== "status") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      // if status=admin : classroom , registernumber, birthdate ,rregisternumber disabled
      if (status === "admin") {
        setFormData({
          ...formData,
          status: "student",
          disableStudent: true,
          disableAdmin: false,
          jobTitle: ""
        });
      }
      // if status=student : jobTitle disabled
      else if (status === "student") {
        setFormData({
          ...formData,
          status: "admin",
          disableAdmin: true,
          disableStudent: false,
          classRoom: "",
          birthDate: "",
          registerNumber: ""
        });
      }
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (status === "admin") {
      register(status, firstName, lastName, email, password)
        .then(res => {
          alert("welcome");
        })
        .catch(err => {
          alert("can not register");
        });
    } else if (status === "student") { 
      register(status, firstName, lastName, email, password)
        .then(res => {
          alert("welcome");
        })
        .catch(err => {
          alert("can not register");
        });
    }
  };

  const loadingJsx = <Spinner />;

  const componentJsx = (
    <div style={styles.container} className="row page-inner">
      <div className="col-sm-6 offset-sm-3">
        <RegisterForm
          status={status}
          firstName={firstName}
          lastName={lastName}
          birthDate={birthDate}
          classRoom={classRoom}
          registerNumber={registerNumber}
          email={email}
          password={password}
          jobTitle={jobTitle}
          onChange={onChange}
          onSubmit={onSubmit}
          disableStudent={disableStudent}
          disableAdmin={disableAdmin}
        />
      </div>
    </div>
  );

  return <div>{loading ? loadingJsx : componentJsx}</div>;
};
const styles = {
  container: {
    marginTop: 40,
    marginBottom: 20
  }
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { register })(Register);
