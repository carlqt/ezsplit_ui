import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import homeReducer from 'Reducers/homes';

const combinedReducers = combineReducers({
  homeStore: homeReducer,
});

export default createStore(combinedReducers, applyMiddleware(thunk));
