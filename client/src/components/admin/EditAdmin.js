import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Spinner from "../../components/layout/Spinner";
import EditForm from "./HomeAdmin/EditForm";

const UpdateAdmin = ({ isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  const loadingJsx = <Spinner />;

  const componentJsx = (
    <div style={styles.container} className="row page-inner">
      <div className="col-sm-6 offset-sm-3">
        <EditForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          onChange={onChange}
          onSubmit={onSubmit}
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

UpdateAdmin.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(UpdateAdmin);
