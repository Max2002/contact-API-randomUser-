import apiUser from '../../api/apiUser';

export const GET_MY_PROFILE_FETCHING = 'GET_MY_PROFILE/FETCHING';
export const GET_MY_PROFILE_FETCHED = 'GET_MY_PROFILE/FETCHED';
export const ERROR = 'ERROR';

const myProfileFetching = () => ({
  type: GET_MY_PROFILE_FETCHING,
  payload: true,
});

const myProfileFetched = (profile) => ({
  type: GET_MY_PROFILE_FETCHED,
  payload: { profile, loading: false },
});

const myProfileError = (error) => ({
  type: ERROR,
  payload: { error, loading: true },
});

export const getMyProfile = (email) => (dispatch) => {
  dispatch(myProfileFetching());
  apiUser
    .get('/', { params: { seed: email } })
    .then((user) => dispatch(myProfileFetched(user.data.results[0])))
    .catch((error) => dispatch(myProfileError(error)));
};
