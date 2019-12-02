import React from "react";
import { Jumbotron } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

const Landing = ({ isAuthenticated, loading }) => {
  if (isAuthenticated) {
    if (localStorage.admin === "true") {
      return <Redirect to="/homeadmin" />;
    }
    if (localStorage.admin === "false") {
      return <Redirect to="/homestudent" />;
    }
  }

  const loadingJsx = <Spinner />;

  const componentJsx = (
    <section style={styles.landingContainer} className="landing">
      <div className="dark-overlay container">
        <div className="landing-inner">
          <Jumbotron>
            <div className="jambotroContainer ">
              <h1 className="x-large">Student Request</h1>
              <p className="lead ">
                For students send requests to your school, get answers and tips.
                For administration of the school recieve all requests of your
                students and respond to them
              </p>
              <div className="buttons">
                <Link type="button" className="btn btn-primary" to="/register">
                  Sign up
                </Link>
                <Link type="button" className="btn btn-info" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </Jumbotron>
        </div>
      </div>
    </section>
  );

  return <div>{loading ? loadingJsx : componentJsx}</div>;
};

const styles = {
  landingContainer: {
    height: window.innerHeight
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, {})(Landing);
