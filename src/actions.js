import {userTasks} from './graphql';

export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASKS_COMMIT = 'FETCH_TASKS_COMMIT';
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_COMMIT = 'CREATE_TASK_COMMIT';

export const fetchTasks = (startDateTime, endDateTime) => {
  return {
    type: FETCH_TASKS,
    payload: {startDateTime, endDateTime},
    meta: {
      offline: {
        effect: {
          query: userTasks,
          variables: {
            startDateTimeUtc: startDateTime,
            endDateTimeUtc: endDateTime,
          },
        },
        commit: {
          type: FETCH_TASKS_COMMIT,
          meta: {startDateTime, endDateTime},
        },
      },
    },
  };
};

export const createTask = task => {
  return {
    type: CREATE_TASK,
    payload: task,
    meta: {
      offline: {
        effect: {
          query: createTask,
          variables: {
            task,
          },
        },
      },
      commit: {
        type: CREATE_TASK_COMMIT,
        meta: {task},
      },
    },
  };
};
