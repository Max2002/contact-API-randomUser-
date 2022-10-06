import apiUser from '../../api/apiUser';

export const GET_MY_PROFILE_FETCHING = 'GET_MY_PROFILE/FETCHING';
export const GET_MY_PROFILE_SUCCESS = 'GET_MY_PROFILE/SUCCESS';
export const GET_MY_PROFILE_ERROR = 'GET_MY_PROFILE/ERROR';
export const MY_PROFILE_LOG_OUT = 'MY_PROFILE/LOG_OUT';

const myProfileFetching = () => ({
  type: GET_MY_PROFILE_FETCHING,
});

const myProfileSuccess = (profile) => ({
  type: GET_MY_PROFILE_SUCCESS,
  payload: profile,
});

const myProfileError = (error) => ({
  type: GET_MY_PROFILE_ERROR,
  payload: error,
});

export const logOut = () => ({
  type: MY_PROFILE_LOG_OUT,
});

export const getMyProfile = (email) => async (dispatch) => {
  dispatch(myProfileFetching());
  try {
    const {
      data: {
        results: [user],
      },
    } = await apiUser.get('/', { params: { seed: email } });

    localStorage.setItem('auth', email);

    dispatch(myProfileSuccess(user));
  } catch (error) {
    dispatch(myProfileError(error));
  }
};
