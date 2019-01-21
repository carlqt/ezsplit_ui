import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import homeReducer from 'Reducers/homes';
import appReducer from 'Reducers/app';
import receiptsReducer from 'Reducers/receipts';
import accountReducer from 'Reducers/account';
import profileReducer  from 'Reducers/profile';

const combinedReducers = combineReducers({
  homeStore: homeReducer,
  appStore: appReducer,
  receiptsStore: receiptsReducer,
  accountStore: accountReducer,
  profileStore: profileReducer,
});

export default createStore(combinedReducers, applyMiddleware(thunk));
