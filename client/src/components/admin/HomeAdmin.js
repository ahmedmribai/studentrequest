import React, { Fragment } from "react";
import { connect } from "react-redux";

import RequestsContainer from "../admin/HomeAdmin/RequestsContainer";
import AdminProfile from "./HomeAdmin/AdminProfile";
import Spinner from "../layout/Spinner";

const HomeAdmin = ({ auth: { user }, loading }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    <div style={styles.container} className="row page-inner">
      <div className="col-sm-12">
        <Fragment>
          <h1 className="page-title">Administration Home</h1>
          <p className="lead">Welcome {user && user.firstName}</p>
          <AdminProfile />
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

export default connect(mapStateToProps)(HomeAdmin);
