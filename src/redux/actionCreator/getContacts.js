import { useSelector } from 'react-redux';
import { locale } from 'moment/moment';
import { authSelector } from '../selectors/getMyProfile';
import apiUser from '../../api/apiUser';

export const GET_CONTACTS_FETCHING = 'GET_CONTACTS/FETCHING';
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS/SUCCESS';
export const GET_CONTACTS_ERROR = 'GET_CONTACTS/ERROR';

const contactsFetching = () => ({
  type: GET_CONTACTS_FETCHING,
});

const contactsSuccess = (contacts) => ({
  type: GET_CONTACTS_SUCCESS,
  payload: contacts,
});

const contactsError = (error) => ({
  type: GET_CONTACTS_ERROR,
  payload: error,
});

export const getContacts = (page, conutCotacts) => async (dispatch) => {
  dispatch(contactsFetching());

  try {
    const {
      data: { results },
    } = await apiUser.get('/', {
      params: {
        seed: localStorage.getItem('auth'),
        page,
        results: conutCotacts,
      },
    });

    dispatch(contactsSuccess(results));
  } catch (error) {
    dispatch(contactsError(error));
  }
};
