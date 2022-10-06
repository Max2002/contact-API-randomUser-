import {
  GET_MY_PROFILE_ERROR,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FETCHING,
  MY_PROFILE_LOG_OUT,
} from '../actionCreator/getMyProfile';

const initialState = {
  authKey: localStorage.getItem('auth'),
  data: {
    name: '',
    picture: {},
  },
  loading: true,
  error: null,
};

const myProfile = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MY_PROFILE_FETCHING: {
      return { ...state };
    }
    case GET_MY_PROFILE_SUCCESS: {
      return {
        ...state,
        authKey: payload.email,
        data: payload,
        loading: false,
      };
    }
    case GET_MY_PROFILE_ERROR: {
      return { ...state, payload, loading: true };
    }
    case MY_PROFILE_LOG_OUT: {
      localStorage.removeItem('auth');

      return { ...initialState, authKey: null };
    }
    default:
      return initialState;
  }
};

export default myProfile;
