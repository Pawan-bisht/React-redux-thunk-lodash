import { combineReducers } from 'redux';
import postReducer from './postReducer';
import fetchUsers from './fetchUsers';
export default combineReducers({
    posts : postReducer,
    users : fetchUsers
});