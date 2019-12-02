import React, { Fragment } from "react";
import { connect } from "react-redux";

import RequestModal from "./HomeStudent/RequestModal";
import RequestsContainer from "./HomeStudent/RequestsContainer";
import Spinner from "../layout/Spinner";
import StudentProfile from "./HomeStudent/StudentProfile";

const HomeStudent = ({ auth: { user }, loading }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    <div style={styles.container} className="row page-inner">
      <div className="col-sm-12">
        <Fragment>
          <h1 className="page-title">Student Home</h1>
          <p className="lead">Welcome {user && user.firstName}</p>
          <div className="row">
            <StudentProfile />
            <RequestModal />
          </div> 
          <RequestsContainer />
        </Fragment>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: 40,
    marginBottom: 20
  }
};
const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(HomeStudent);
