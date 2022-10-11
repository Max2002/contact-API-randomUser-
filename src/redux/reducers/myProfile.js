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
  loading: false,
  error: null,
};

const myProfile = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MY_PROFILE_FETCHING: {
      return { ...state, loading: true, error: null, authKey: payload };
    }
    case GET_MY_PROFILE_SUCCESS: {
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };
    }
    case GET_MY_PROFILE_ERROR: {
      return { ...state, payload, loading: true };
    }
    case MY_PROFILE_LOG_OUT: {
      return { ...initialState, authKey: null };
    }
    default:
      return initialState;
  }
};

export default myProfile;
