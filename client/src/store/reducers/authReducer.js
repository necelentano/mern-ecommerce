import {
  AUTH_INFO_SUCCESS,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_GOOGLE_REQUEST,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,

  sendEmailInProgress: false,
  sendEmailError: null,

  loginInProgress: false,
  loginError: null,

  loginGoogleInProgress: false,
  loginGoogleError: null,

  signupInProgress: false,
  signupError: null,

  logoutInProgress: false,
  logoutError: null,

  user: null,
};

export const authReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_INFO_SUCCESS:
      return {
        ...state,
        isAuthenticated: !!payload,
        user: payload,
      };

    case SEND_EMAIL_REQUEST:
      return { ...state, sendEmailInProgress: true, loginError: null };
    case SEND_EMAIL_SUCCESS:
      return { ...state, sendEmailInProgress: false, isAuthenticated: true };
    case SEND_EMAIL_ERROR:
      return { ...state, sendEmailInProgress: false, loginError: payload };

    case LOGIN_REQUEST:
      return { ...state, loginInProgress: true, loginError: null };
    case LOGIN_SUCCESS:
      return { ...state, loginInProgress: false, isAuthenticated: true };
    case LOGIN_ERROR:
      return { ...state, loginInProgress: false, loginError: payload };

    case LOGIN_GOOGLE_REQUEST:
      return { ...state, loginGoogleInProgress: true, loginGoogleError: null };
    case LOGIN_GOOGLE_SUCCESS:
      return { ...state, loginGoogleInProgress: false, isAuthenticated: true };
    case LOGIN_GOOGLE_ERROR:
      return {
        ...state,
        loginGoogleInProgress: false,
        loginGoogleError: payload,
      };

    case SIGNUP_REQUEST:
      return { ...state, signupInProgress: true, signupError: null };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupInProgress: false,
        isAuthenticated: true,
      };
    case SIGNUP_ERROR:
      return { ...state, signupInProgress: false, signupError: payload };

    case LOGOUT_REQUEST:
      return { ...state, logoutInProgress: true, logoutError: null };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutInProgress: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_ERROR:
      return { ...state, logoutInProgress: false, logoutError: payload };
    default:
      return state;
  }
};

export default authReducer;
