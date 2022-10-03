import { createSelector } from 'reselect';

const getMyProfile = (state) => state.getMyProfile;

export const getStatus = (state) => getMyProfile(state).status;
const getName = (state) => getMyProfile(state).name;
const getPicture = (state) => getMyProfile(state).picture;
const getTitleName = (state) => getName(state)?.title;
const getFirstName = (state) => getName(state)?.first;
const getLastName = (state) => getName(state)?.last;

export const getAvatar = (state) => getPicture(state)?.large;

export const fullNameSelector = createSelector(
  [getTitleName, getFirstName, getLastName],
  (title, first, last) => ({
    fullName: `${title}, ${first} ${last}`,
  }),
);
