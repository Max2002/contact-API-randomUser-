import { createSelector } from 'reselect';

const myProfileSelector = (state) => state.myProfile;
const myDataSelector = createSelector(
  myProfileSelector,
  (myProfile) => myProfile.data,
);

export const authSelector = createSelector(
  myProfileSelector,
  (myProfile) => myProfile.authKey,
);
export const loadingSelector = createSelector(
  myProfileSelector,
  (myProfile) => myProfile.loading,
);
export const fullNameSelector = createSelector(myDataSelector, ({ name }) => {
  const { title, first, last } = name;

  return `${title}, ${first} ${last}`;
});

export const avatarSelector = createSelector(
  myDataSelector,
  ({ picture }) => picture,
);
