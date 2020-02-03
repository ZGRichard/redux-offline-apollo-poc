import client from './apollo-client';
import {userTasks, createTask as createTaskMutation} from './graphql';

export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASKS_COMMIT = 'FETCH_TASKS_COMMIT';
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_COMMIT = 'CREATE_TASK_COMMIT';

export const fetchTasksCommit = res => ({
  type: FETCH_TASKS_COMMIT,
  payload: res,
});

export const fetchTasks = (startDateTime, endDateTime) => {
  return async dispatch => {
    dispatch({type: FETCH_TASKS});
    const res = await client.query({
      query: userTasks,
      variables: {
        startDateTimeUtc: startDateTime,
        endDateTimeUtc: endDateTime,
      },
      errorPolicy: 'all',
    });

    dispatch(fetchTasksCommit(res));
  };
};

export const createTask = task => {
  return {
    type: CREATE_TASK,
    payload: task,
    meta: {
      offline: {
        effect: {
          mutation: createTaskMutation,
          variables: {
            taskInput: task,
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
