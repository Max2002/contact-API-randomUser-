import { createSelector } from 'reselect';

const myProfileSelector = (state) => state.myProfile;
const myDataSelector = createSelector(
  myProfileSelector,
  (myProfile) => myProfile.data,
);
const dobSelector = createSelector(myDataSelector, (data) => data.dob);
const locationSelector = createSelector(
  myDataSelector,
  (data) => data.location,
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

export const ageSelector = createSelector(dobSelector, (dob) => dob?.age);
export const emailSelector = createSelector(
  myDataSelector,
  (data) => data.email,
);
export const phoneSelector = createSelector(
  myDataSelector,
  (data) => data.phone,
);
export const addressSelector = createSelector(locationSelector, (location) => {
  if (location) {
    const { country, street, city, state, postcode } = location;
    const { number, name } = street;

    return `/${country}/ ${number} ${name}, ${city}, ${state} ${postcode}`;
  }

  return undefined;
});
export const nationalitySelector = createSelector(
  myDataSelector,
  (data) => data.nat,
);
