import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import auth from '../reducers/auth';
import device from '../reducers/device';
import geolocation from '../reducers/geolocation';

const logger = createLogger();
const reducer = combineReducers({auth, device, geolocation});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
