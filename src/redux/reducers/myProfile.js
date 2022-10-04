import {
  ERROR,
  GET_MY_PROFILE_FETCHED,
  GET_MY_PROFILE_FETCHING,
} from '../actionCreator/getMyProfile';

const initialState = {
  name: {},
  picture: {},
  loading: true,
  error: null,
};

const myProfile = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_PROFILE_FETCHING: {
      return { ...state, loading: action.payload };
    }
    case GET_MY_PROFILE_FETCHED: {
      const { profile, loading } = action.payload;
      const { name, picture } = profile;

      return { ...state, name, picture, loading };
    }
    case ERROR: {
      const { error, loading } = action.payload;

      return { ...state, error, loading };
    }
    default:
      return initialState;
  }
};

export default myProfile;
