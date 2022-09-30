import { createSelector } from '@reduxjs/toolkit';

const userTitleSelector = (state) => state.reducerUsers.name?.title;
const userFirstSelector = (state) => state.reducerUsers.name?.first;
const userLastSelector = (state) => state.reducerUsers.name?.last;
const userAvatarSelector = (state) => state.reducerUsers.picture?.large;

const welcomeUserSelector = createSelector(
  [userTitleSelector, userFirstSelector, userLastSelector, userAvatarSelector],
  (title, first, last, large) => ({
    title,
    first,
    last,
    large,
  }),
);

export default welcomeUserSelector;
