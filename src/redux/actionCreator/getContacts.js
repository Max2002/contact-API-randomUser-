import apiUser from '../../api/apiUser';
import { authSelector } from '../selectors/getMyProfile';

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

export const getContacts =
  (page, countContacts) => async (dispatch, getState) => {
    dispatch(contactsFetching());

    try {
      const store = getState();
      const authKey = authSelector(store);
      const {
        data: { results },
      } = await apiUser.get('/', {
        params: {
          seed: authKey,
          page,
          results: countContacts,
        },
      });

      dispatch(contactsSuccess(results));
    } catch (error) {
      dispatch(contactsError(error));
    }
  };
