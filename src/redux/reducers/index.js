import { combineReducers } from 'redux';
import myProfile from './myProfile';
import contacts from './contacts';
import viewContact from './viewContact';

export const rootReducer = combineReducers({
  myProfile,
  contacts,
  viewContact,
});
