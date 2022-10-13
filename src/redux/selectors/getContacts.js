import { createSelector } from 'reselect';

const contactsSelector = (state) => state.contacts;

export const dataSelector = createSelector(
  contactsSelector,
  (contacts) => contacts.data,
);
