import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import LoginForm from "./login/LoginForm";

// import spinner
import Spinner from "../../components/layout/Spinner";

// redux
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated, loading }) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    admin: true
  });

  const { email, password, admin } = formState;

  const onChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onChangeAdmin = e => {
    setFormState({ ...formState, admin: !admin });
  };

  if (isAuthenticated) {
    if (localStorage.admin === "true") {
      return <Redirect to="/homeadmin" />;
    }
    if (localStorage.admin === "false") {
      return <Redirect to="/homestudent" />;
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    login(email, password, admin)
      .then(res => {
        alert("welcome");
      })
      .catch(err => {
        alert("can not connect to the server");
      });
  };


    const loadingJsx = (
      <Spinner/>
    );

    const componentJsx = (
      <div style={styles.container} className="row page-inner">
      <div className="col-sm-6 offset-sm-3">
        <LoginForm
          email={email}
          password={password}
          admin={admin}
          onChange={onChange}
          onSubmit={onSubmit}
          onChangeAdmin={onChangeAdmin}
        />
      </div>
    </div>
    );

  return (
    <div>
      {loading ? loadingJsx : componentJsx}
    </div>
  );
}

const styles = {
  container: {
    marginTop: 50
  }
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading : state.auth.loading
});

export default connect(mapStateToProps, { login })(Login);
