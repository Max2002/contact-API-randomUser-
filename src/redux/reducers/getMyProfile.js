import { ERROR, MY_PROFILE_FETCHED, MY_PROFILE_FETCHING } from '../actions';

const initialState = {
  name: {},
  picture: {},
  status: 'idle',
};

const getMyProfile = (state = initialState, action) => {
  switch (action.type) {
    case MY_PROFILE_FETCHING: {
      return { ...state, status: action.payload };
    }
    case MY_PROFILE_FETCHED: {
      const { myProfile, status } = action.payload;
      const { name, picture } = myProfile;

      return { ...state, name, picture, status };
    }
    case ERROR: {
      const { error, status } = action.payload;

      return { ...state, error, status };
    }
    default:
      return initialState;
  }
};

export default getMyProfile;
