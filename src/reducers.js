import {combineReducers} from 'redux';
import {keyBy} from 'lodash';
import {FETCH_TASKS_COMMIT} from './actions';

const initialState = {
  tasks: {},
};

const entitiesReducer = (state = initialState, action) => {
  // console.log('action', action);
  switch (action.type) {
    case FETCH_TASKS_COMMIT: {
      return {
        ...state,
        tasks: keyBy(action.payload.data.userTasks.content, 'id'),
      };
    }
    default:
      return state;
  }
};

export default combineReducers({entities: entitiesReducer});
