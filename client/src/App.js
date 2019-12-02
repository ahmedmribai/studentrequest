import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Spinner from "./components/layout/Spinner";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import About from "./components/auth/About";
import HomeAdmin from "./components/admin/HomeAdmin";
import HomeStudent from "./components/student/HomeStudent";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./App.css";
import "./custom.css";
import StudentRequest from "./components/admin/StudentRequest";
import { loadUser, stopReloading } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import UpdateStudent from "./components/student/EditStudent";
import UpdateAdmin from "./components/admin/EditAdmin";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUser, isAuthenticated, loading, stopReloading }) => {
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin !== "null") {
      if (admin === "true") {
        loadUser(true);
      } else if (admin === "false") {
        loadUser(false);
      }
    } else {
      stopReloading();
    }
    stopReloading();
  }, []);

  return (
    <Router>
      <Route exact path="/spinner" component={Spinner} />
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />
            <Route exact path="/homeadmin" component={HomeAdmin} />
            <Route exact path="/homestudent" component={HomeStudent} />
            <Route exact path="/studentrequest" component={StudentRequest} />
            <Route exact path="/updatestudent" component={UpdateStudent} />
            <Route exact path="/updateadmin" component={UpdateAdmin} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
  stopReloading: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { loadUser, stopReloading })(App);
