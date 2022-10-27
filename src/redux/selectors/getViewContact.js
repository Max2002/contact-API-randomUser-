import { createSelector } from 'reselect';

const contactSelector = (state) => state.viewContact;
const dataSelector = createSelector(contactSelector, (contact) => contact.data);
const dobSelector = createSelector(dataSelector, (data) => data.dob);
const locationSelector = createSelector(dataSelector, (data) => data.location);

export const fullNameSelector = createSelector(dataSelector, ({ name }) => {
  if (name) {
    const { title, first, last } = name;

    return `${title}, ${first} ${last}`;
  }

  return undefined;
});

export const avatarSelector = createSelector(
  dataSelector,
  ({ picture }) => picture,
);

export const ageSelector = createSelector(dobSelector, (dob) => dob?.age);
export const emailSelector = createSelector(dataSelector, (data) => data.email);
export const phoneSelector = createSelector(dataSelector, (data) => data.phone);
export const addressSelector = createSelector(locationSelector, (location) => {
  if (location) {
    const { country, street, city, state, postcode } = location;
    const { number, name } = street;

    return `/${country}/ ${number} ${name}, ${city}, ${state} ${postcode}`;
  }

  return undefined;
});
export const nationalitySelector = createSelector(
  dataSelector,
  (data) => data.nat,
);
