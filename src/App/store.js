import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import homeReducer from 'Reducers/homes';
import appReducer from 'Reducers/app';

const combinedReducers = combineReducers({
  homeStore: homeReducer,
  appStore: appReducer,
});

export default createStore(combinedReducers, applyMiddleware(thunk));
