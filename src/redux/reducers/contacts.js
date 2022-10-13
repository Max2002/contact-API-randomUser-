import {
  GET_CONTACTS_FETCHING,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_ERROR,
} from '../actionCreator/getContacts';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const contacts = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CONTACTS_FETCHING: {
      return { ...state, loading: true, error: null };
    }
    case GET_CONTACTS_SUCCESS: {
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };
    }
    case GET_CONTACTS_ERROR: {
      return { ...state, error: payload, loading: true };
    }
    default:
      return state;
  }
};

export default contacts;
