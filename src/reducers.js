import {combineReducers} from 'redux';
import {keyBy} from 'lodash';
import {
  FETCH_TASKS_COMMIT,
  CREATE_TASK,
  START_TASK,
  START_TASK_ROLLBACK,
  SUBMIT_TASK,
  COMPLETE_TASK,
} from './actions';

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
    case CREATE_TASK: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.id]: action.payload,
        },
      };
    }
    case START_TASK: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload]: {
            ...state.tasks[action.payload],
            status: 'IN_PROGRESS',
          },
        },
      };
    }
    case START_TASK_ROLLBACK: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload]: {
            ...state.tasks[action.payload],
            status: 'HAS_NOT_STARTED',
          },
        },
      };
    }
    case SUBMIT_TASK: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload]: {
            ...state.tasks[action.payload],
            status: 'SUBMITTED',
          },
        },
      };
    }
    case COMPLETE_TASK: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload]: {
            ...state.tasks[action.payload],
            status: 'COMPLETED',
          },
        },
      };
    }
    default:
      return state;
  }
};

export default combineReducers({entities: entitiesReducer});
