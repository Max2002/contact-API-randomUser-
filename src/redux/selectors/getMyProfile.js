import { createSelector } from 'reselect';

const getMyProfile = (state) => state.myProfile;

export const getStatus = createSelector(
  getMyProfile,
  (myProfile) => myProfile.loading,
);
export const fullNameSelector = createSelector(getMyProfile, ({ name }) => {
  const { title, first, last } = name;

  return `${title}, ${first} ${last}`;
});

export const getAvatar = createSelector(
  getMyProfile,
  ({ picture }) => picture.large,
);
