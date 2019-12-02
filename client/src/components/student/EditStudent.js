import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Spinner from "../../components/layout/Spinner";
import EditForm from "./HomeStudent/EditForm";
import updateStudent from "../../actions/auth";

const UpdateStudent = ({ isAuthenticated, loading, user, updateStudent }) => {
  //const {user} = useConnect();

  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  }, [user]);
  const { firstName, lastName, email } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateStudent({ email, firstName, lastName });
  };

  const loadingJsx = <Spinner />;

  const componentJsx = (
    <div style={styles.container} className="row page-inner">
      <div className="col-sm-6 offset-sm-3">
        <EditForm
          firstName={firstName}
          lastName={lastName}
          email={email}
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

UpdateStudent.propTypes = {
  isAuthenticated: PropTypes.bool,
  updateStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { updateStudent })(UpdateStudent);
