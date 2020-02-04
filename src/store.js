import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import thunk from 'redux-thunk';
import {offline} from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

import reducers from './reducers';
import client from './apollo-client';
import {taskSubmitEpic} from './epics';

const effect = async (_effect, _action) => {
  console.log('run this effect', _effect);

  // Mutations are the only ones that need to be
  // handled by redux-offline
  const res = await client.mutate({
    mutation: _effect.mutation,
    variables: _effect.variables,
    errorPolicy: 'all',
  });

  console.log('res', res);

  if (res.errors) {
    res.errors.forEach(error => {
      if (error.extensions.exception && error.extensions.exception.statusCode) {
        throw error;
      }
    });
  }

  return res;
};

const discard = (error, _action, _retries) => {
  const {response, extensions} = error;

  console.log('error', {...error});
  console.log('discard action', _action);
  console.log('discard retries', _retries);

  if (extensions && extensions.exception && extensions.exception.statusCode) {
    console.log(
      'extensions.exception.statusCode',
      extensions.exception.statusCode,
    );

    if (
      _action.meta.offline.effect.discardOn &&
      _action.meta.offline.effect.discardOn.includes(
        extensions.exception.statusCode,
      )
    ) {
      return true;
    }

    return (
      400 <= extensions.exception.statusCode &&
      extensions.exception.statusCode < 500
    );
  }

  return response && 400 <= response.status && response.status < 500;
};

const epicMiddleware = createEpicMiddleware();

const enhancedApplyMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (...args) =>
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(...args))
  : (...args) => applyMiddleware(...args);

const configureStore = initialState => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      offline({...offlineConfig, effect, discard}),
      enhancedApplyMiddleware(epicMiddleware, thunk),
    ),
  );

  epicMiddleware.run(taskSubmitEpic);

  return store;
};

export default configureStore();
