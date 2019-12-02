import { REQUEST_SUCCESS, REQUEST_FAIL } from "../requestActions/types";
const initialState = {
  token: localStorage.getItem("token"),
  loading: true,
  request: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_LOADED:
      return {
        ...state,
        loading: false,
        request: payload
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false
      };
    case REQUEST_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        request: null
      };
    case REMOVE_REQUEST:
      return {
        ...state,
        loading: false,
        request: null
      };
    default:
      return state;
  }
}
