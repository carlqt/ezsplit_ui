import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from 'redux-thunk';
import homeReducer from 'Reducers/homes';
import appReducer from 'Reducers/app';
import receiptsReducer from 'Reducers/receipts';
import accountReducer from 'Reducers/account';
import profileReducer  from 'Reducers/profile';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const combinedReducers = combineReducers({
  homeStore: homeReducer,
  appStore: appReducer,
  receiptsStore: receiptsReducer,
  accountStore: accountReducer,
  profileStore: profileReducer,
});

export default createStore(combinedReducers, composeEnhancers(applyMiddleware(thunk)));
