import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REMOVE_USER,
  USER_TO_BE_LOADED,
  USER_NOT_LOADED,
  UPDATE_SUCCESS,
  UPDATE_FAIL
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// load user
export const loadUser = admin => async dispatch => {
  dispatch({
    type: USER_TO_BE_LOADED
  });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    if (admin === true) {
      axios
        .get("http://localhost:4000/api/admins/single/currentaccount")
        .then(element => {
          dispatch({
            type: USER_LOADED,
            payload: element.data
          });
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.removeItem("admin", "token");
            dispatch({
              type: REMOVE_USER
            });
          }
        });
    } else if (admin === false) {
      axios
        .get("http://localhost:4000/api/students/single/currentaccount")
        .then(element => {
          dispatch({
            type: USER_LOADED,
            payload: element.data
          });
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.removeItem("admin", "token");
            dispatch({
              type: REMOVE_USER
            });
          }
        });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// stop reloading
export const stopReloading = () => async dispatch => {
  dispatch({
    type: USER_NOT_LOADED
  });
};

// ==================== register user =====================
const register = (
  status,
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return new Promise(function(resolve, reject) {
    try {
      if (status === "admin") {
        const body = JSON.stringify({
          firstName,
          lastName,
          email,
          password
        });

        axios
          .post("http://localhost:4000/api/admins/signup", body, config)
          .then(res => {
            dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data
            });

            dispatch(loadUser(true));
            localStorage.setItem("admin", true);
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      } else if (status === "student") {
        const body = JSON.stringify({
          firstName,
          lastName,
          email,
          password
        });
        axios
          .post("http://localhost:4000/api/students/signup", body, config)
          .then(res => {
            dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data
            });
            localStorage.setItem("admin", false);
            dispatch(loadUser(false));
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      }
    } catch (err) {
      console.log(err.response);

      if (err.response) {
        const errors = err.response.data.errors;
        if (errors) {
          alert("error in register");
        }
      } else {
        alert("can not connect to the server");
      }

      dispatch({
        type: REGISTER_FAIL
      });
      reject(err);
    }
  });
};

// ============= login user ====================
export const login = (email, password, admin) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return new Promise(function(resolve, reject) {
    try {
      if (admin === true) {
        const body = JSON.stringify({ email, password });

        axios
          .post("http://localhost:4000/api/admins/login", body, config)
          .then(res => {
            dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data
            });

            localStorage.setItem("admin", true);
            dispatch(loadUser(true));
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      } else if (admin === false) {
        const body = JSON.stringify({ email, password });

        axios
          .post("http://localhost:4000/api/students/signin", body, config)
          .then(res => {
            dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data
            });
            localStorage.setItem("admin", false);
            dispatch(loadUser(false));
          })
          .catch(err => {
            reject(err);
          });
      }
    } catch (err) {
      const errors = err.response.data.errors;

      dispatch({
        type: LOGIN_FAIL
      });
      reject(errors);
    }
  });
};

// ================ update student
export const updateStudent = (firstName, lastName, email) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return new Promise(function(resolve, reject) {
    try {
      const body = JSON.stringify({
        firstName,
        lastName,
        email
      });
      axios
        .put("http://localhost:4000/api/students/", body, config)
        .then(res => {
          dispatch({
            type: UPDATE_SUCCESS,
            payload: res.data
          });

          dispatch(loadUser(true));
          localStorage.setItem("admin", true);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    } catch (err) {
      console.log(err.response);

      if (err.response) {
        const errors = err.response.data.errors;
        if (errors) {
          alert("error while updating");
        }
      } else {
        alert("can not connect to the server");
      }

      dispatch({
        type: UPDATE_FAIL
      });
      reject(err);
    }
  });
};

// logout / clear profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  localStorage.setItem("admin", null);
};

export default register;
