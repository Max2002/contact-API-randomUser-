import { combineReducers } from 'redux';
import myProfile from './myProfile';
import contacts from './contacts';

export const rootReducer = combineReducers({ myProfile, contacts });
