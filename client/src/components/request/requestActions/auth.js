import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";

import {
  REQUEST_SUCCESS,
  REQUEST_FAIL,
  REQUEST_TO_BE_LOADED,
  REQUEST_LOADED,
  REMOVE_REQUEST,
  AUTH_ERROR,
  REQUEST_DELETED
} from "./types";

// =========== make a request=================================================
export const makeRequest = (subject, text) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return new Promise(function(resolve, reject) {
    try {
      const body = JSON.stringify({
        subject,
        text
      });

      axios
        .post("http://localhost:4000/api/messages/request", body, config)
        .then(res => {
          dispatch({
            type: REQUEST_SUCCESS,
            payload: res.data
          });

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
          alert("error sending request");
        }
      } else {
        alert("can not connect to the server");
      }

      dispatch({
        type: REQUEST_FAIL
      });
      reject(err);
    }
  });
};
// ============================load request========================
export const loadRequest = () => async dispatch => {
  dispatch({
    type: REQUEST_TO_BE_LOADED
  });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    axios
      .get("http://localhost:4000/api/request/" /*+ requestid*/)
      .then(element => {
        dispatch({
          type: REQUEST_LOADED,
          payload: element.data
        });
      })
      .catch(err => {
        if (err.response.status === 401) {
          localStorage.removeItem("admin", "token");
          dispatch({
            type: REMOVE_REQUEST
          });
        }
      });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// =================== delete a request ===============
export const deleteRequest = () => async dispatch => {
  try {
    axios
      .delete("http://localhost:4000/api/request/" /*+ requestid*/)
      .then(element => {
        dispatch({
          type: REQUEST_DELETED,
          payload: element.data
        });
      })
      .catch(err => {
        if (err.response.status === 401) {
          dispatch({
            type: REMOVE_REQUEST
          });
        }
      });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
