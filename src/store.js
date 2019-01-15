import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import homeReducer from 'Reducers/homes';
import appReducer from 'Reducers/app';
import receiptsReducer from 'Reducers/receipts';

const combinedReducers = combineReducers({
  homeStore: homeReducer,
  appStore: appReducer,
  receiptsStore: receiptsReducer,
});

export default createStore(combinedReducers, applyMiddleware(thunk));
