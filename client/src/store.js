import { applyMiddleware, createStore, combineReducers } from 'redux';
//Remove '/developmentOnly' from the end only if you want devtool on production also.
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import {userLoginReducer, userSignupReducer} from './reducers/userReducers';
const middleware = [thunk, promiseMiddleware];

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userSignup: userSignupReducer
});

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;