import {
  GET_VIEW_CONTACT_FETCHING,
  GET_VIEW_CONTACT_SUCCESS,
  GET_VIEW_CONTACT_ERROR,
} from '../actionCreator/getViewContact';

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const contacts = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VIEW_CONTACT_FETCHING: {
      return { ...state, loading: true, error: null };
    }
    case GET_VIEW_CONTACT_SUCCESS: {
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };
    }
    case GET_VIEW_CONTACT_ERROR: {
      return { ...state, error: payload, loading: true };
    }
    default:
      return state;
  }
};

export default contacts;
