import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {offline} from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import reducers from './reducers';
import client from './apollo-client';

const effect = async (_effect, _action) => {
  console.log('run this effect', _effect);

  const res = await client.query({
    query: _effect.query,
    variables: _effect.variables,
    errorPolicy: 'all',
  });

  console.log('res', res);

  return res;
};

const discard = (error, _action, _retries) => {
  const {response} = error;

  console.log('error', error);
  console.log('discard action', _action);
  console.log('discard retries', _retries);
  console.log('response', response);

  // _action.meta.offline.retryOn.includes(response.status);

  return response && 400 <= response.status && response.status < 500;
};

const epicMiddleware = createEpicMiddleware();

const enhancedApplyMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (...args) =>
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(...args))
  : (...args) => applyMiddleware(...args);

const configureStore = initialState => {
  return createStore(
    reducers,
    initialState,
    compose(
      offline({...offlineConfig, effect, discard}),
      enhancedApplyMiddleware(epicMiddleware),
    ),
  );
};

export default configureStore();
