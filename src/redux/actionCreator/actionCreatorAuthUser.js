import instance from '../../api/api';
import { GET_AUTH_USER } from '../actions';

export const actionCreatorAuthUser = (email) => (dispatch) => {
  instance(`/?seed=${email}`)
    .then((user) =>
      dispatch({
        type: GET_AUTH_USER,
        payload: user.data.results[0],
      }),
    )
    .catch((error) => console.log(error));
};
