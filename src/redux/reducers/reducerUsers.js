import { GET_AUTH_USER } from '../actions';

export const reducerUsers = (state = [], action) => {
  switch (action.type) {
    case GET_AUTH_USER: {
      return action.payload;
    }
    default:
      return state;
  }
};
