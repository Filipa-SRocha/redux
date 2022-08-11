import { combineReducers } from 'redux';

import authReducer from './authReducer';
import peopleReducer from './peopleReducer';
import addressReducer from './addressReducer';

export default combineReducers({
	authReducer,
	peopleReducer,
	addressReducer,
});
