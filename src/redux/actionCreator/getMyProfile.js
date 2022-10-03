import apiUser from '../../api/apiUser';
import { MY_PROFILE_FETCHING, MY_PROFILE_FETCHED, ERROR } from '../actions';

const myProfileFetching = () => ({
  type: MY_PROFILE_FETCHING,
  payload: 'loading',
});

const myProfileFetched = (myProfile) => ({
  type: MY_PROFILE_FETCHED,
  payload: { myProfile, status: 'fetched' },
});

const myProfileError = (error) => ({
  type: ERROR,
  payload: { error, status: 'error' },
});

export const getMyProfile = (email) => (dispatch) => {
  dispatch(myProfileFetching());
  apiUser
    .get('/', { params: { seed: email } })
    .then((user) => dispatch(myProfileFetched(user.data.results[0])))
    .catch((error) => dispatch(myProfileError(error)));
};
